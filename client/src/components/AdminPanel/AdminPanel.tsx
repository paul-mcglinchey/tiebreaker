import { PlusIcon } from "@heroicons/react/solid";
import { Field, FieldArray, Form, Formik } from "formik";
import { Persist } from 'formik-persist'
import { useFetch, useRefresh, useRequestBuilder, useStatus } from "../../hooks";
import { ButtonType, IFetch, IList, IListCollection, IListValue, Status } from "../../models";
import { generateColour } from "../../services";
import { endpoints } from "../../utilities";
import { Button, DeleteDialog, Fetch, NavMenu, SpinnerIcon, Toolbar } from "../Common";
import { ListItem } from ".";
import { useState } from "react";

const AdminPanel = () => {
  const { dependency, refresh } = useRefresh();
  const { appendStatus } = useStatus()
  const { requestBuilder } = useRequestBuilder();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const toggleDeleteDialogOpen = () => setDeleteDialogOpen(!deleteDialogOpen)

  const init = async () => {
    const res = await fetch(endpoints.systemlistcollections, requestBuilder('POST', undefined, { lists: [] }))
    if (!res.ok) return appendStatus(false, 'Something went wrong...', Status.Error)

    refresh()
  }

  const update = async (listcollectionId: string | undefined, values: IListCollection) => {
    if (!listcollectionId) return appendStatus(false, 'Something went wrong...', Status.Error)
    const res = await fetch(endpoints.systemlistcollection(listcollectionId), requestBuilder('PUT', undefined, values))

    if (!res.ok) return appendStatus(false, 'A problem occurred updating the list collection', Status.Error)

    return appendStatus(false, 'Updated list collection', Status.Success)
  }

  return (
    <>
      <NavMenu />
      <div className="px-2 sm:px-6 lg:px-8 text-gray-300">
        <Fetch
          fetchOutput={useFetch(endpoints.systemlistcollections, requestBuilder(), [dependency])}
          render={({ response, isLoading }: IFetch<IListCollection>) => (
            <>
              {!isLoading && response ? (
                <Formik
                  initialValues={response}
                  onSubmit={(values) => {
                    console.log(values)
                    update(response._id, values)
                  }}
                >
                  {({ dirty, values, setFieldValue, touched }) => (
                    <Form>
                      <div>
                        <Toolbar title="Admin panel" />
                        {isLoading && (
                          <SpinnerIcon className="w-6 h-6 text-gray-200" />
                        )}
                      </div>
                      <div className="flex flex-col space-y-4 text-gray-200">
                        <div>
                          <FieldArray
                            name="lists"
                            render={arrayHelpers => (
                              <div>
                                <div className="flex justify-between items-center border-b-2 border-gray-600/60 pb-2 mb-4">
                                  <div>
                                    <h3 className="text-2xl font-semibold tracking-wide text-blue-500">System List Collection</h3>
                                    <span className="text-sm text-gray-400">Last updated {new Date(response.updatedAt || '').toLocaleDateString()}</span>
                                  </div>
                                  <div className="flex space-x-4 items-center">
                                    <Button
                                      content="Add list"
                                      buttonType={ButtonType.Tertiary}
                                      type="button"
                                      Icon={PlusIcon}
                                      action={() => arrayHelpers.push({ name: '', description: '', values: [] })}
                                    />
                                  </div>
                                </div>
                                <div className="flex flex-col space-y-4">
                                  {values.lists.map((list: IList, index: number) => (
                                    <div key={index} className="bg-gray-800 rounded p-4 flex flex-col space-y-4">
                                      <div className="flex justify-between items-center pb-2 border-b border-gray-200/20">
                                        <div className="flex flex-grow flex-col space-y-1">
                                          <Field name={`lists.${index}.description`} placeholder="Descriptive name" className="bg-transparent focus:outline-none font-semibold text-xl" />
                                          <Field name={`lists.${index}.name`} placeholder="Internal field name" className="bg-transparent focus:outline-none font-light text-md tracking-wider text-gray-400" />
                                        </div>
                                        <div className="flex">
                                          <Button type="button" buttonType={ButtonType.Cancel} content="Delete" action={() => toggleDeleteDialogOpen()} />
                                          <DeleteDialog dialogOpen={deleteDialogOpen} toggleDialogOpen={toggleDeleteDialogOpen} itemType="system list" deleteAction={() => arrayHelpers.remove(index)} />
                                        </div>
                                      </div>
                                      <FieldArray
                                        name={`lists.${index}.values`}
                                        render={arrayHelpers => (
                                          <div className="space-y-4">
                                            <div className="flex flex-col space-y-2">
                                              {list.values.map((value: IListValue, vindex: number) => (
                                                <ListItem
                                                  key={vindex}
                                                  name={`lists.${index}.values.${vindex}`}
                                                  setFieldValue={setFieldValue}
                                                  remove={() => arrayHelpers.remove(vindex)}
                                                  index={vindex}
                                                  colour={value.colour}
                                                />
                                              ))}
                                            </div>
                                            <div>
                                              <div className="flex justify-end">
                                                <Button content="Add item" buttonType={ButtonType.Tertiary} type="button" action={() => arrayHelpers.push({ short: '', long: '', colour: generateColour() })} />
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          />
                        </div>
                        <div className="flex justify-end">
                          {console.log(touched)}
                          {dirty && (
                            <Button content="Save changes" buttonType={ButtonType.Primary} />
                          )}
                        </div>
                      </div>
                      <Persist name="systemListCollection" />
                    </Form>
                  )}
                </Formik>
              ) : (
                isLoading ? (
                  <SpinnerIcon className="w-8 h-8 text-gray-300" />
                ) : (
                  <div className="flex justify-center">
                    <button onClick={() => init()} className="font-medium text-2xl hover:opacity-70 hover:text-blue-400 transition-all">
                      The system list collection doesn't exist yet, click here to create it
                    </button>
                  </div>
                )
              )}
            </>
          )}
        />
      </div>
    </>
  )
}

export default AdminPanel;