import { memo, useState } from "react"
import { FieldArray, Form, Formik } from "formik"
import { Persist } from 'formik-persist'
import { PlusIcon } from "@heroicons/react/solid"
import { useFetch, useRequestBuilder, useListCollectionService, useRefresh } from "../../hooks"
import { ButtonType, IFetch, IList, IListCollection, IListValue } from "../../models"
import { generateColour } from "../../services"
import { endpoints } from "../../config"
import { Button, Dialog, Fetch, FetchError, SpinnerIcon } from "../Common"
import { EditableSubPanelTitle, ListItem, Panel, SubPanel, SubPanelContent } from "."

const SystemListCollectionPanel = () => {

  const { requestBuilder } = useRequestBuilder()
  const { dependency, refresh } = useRefresh()
  const { init, update } = useListCollectionService(refresh)

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  return (
    <Fetch
      fetchOutput={useFetch(endpoints.systemlistcollections, requestBuilder(), [dependency], false)}
      render={({ response, isLoading, error }: IFetch<IListCollection>) => (
        <>
          {!isLoading && response && response.lists ? (
            <Formik
              initialValues={response}
              onSubmit={(values) => {
                update(response._id, values)
              }}
            >
              {({ values, setFieldValue }) => (
                <Form>
                  <FieldArray
                    name="lists"
                    render={arrayHelpers => (
                      <Panel title="System List Collection" subtitle={`Last updated ${new Date(response.updatedAt || '').toLocaleDateString()}`}
                        HeaderActions={
                          <Button
                            content="Add list"
                            buttonType={ButtonType.Tertiary}
                            type="button"
                            Icon={PlusIcon}
                            action={() => arrayHelpers.push({ name: '', description: '', values: [] })}
                          />
                        }
                      >
                        <div className="flex flex-col space-y-4">
                          {values.lists.map((list: IList, index: number) => (
                            <SubPanel
                              key={index}
                              Title={<EditableSubPanelTitle name={`lists.${index}.description`} placeholder="Descriptive name" />}
                              Subtitle={<EditableSubPanelTitle name={`lists.${index}.name`} placeholder="Internal field name" subtitle />}
                              HeaderActions={
                                <>
                                  <Button type="button" buttonType={ButtonType.Cancel} content="Delete" action={() => setDeleteDialogOpen(true)} />
                                  <Dialog
                                    isOpen={deleteDialogOpen}
                                    close={() => setDeleteDialogOpen(false)}
                                    positiveActions={[() => arrayHelpers.remove(index), () => setDeleteDialogOpen(false)]}
                                    title="Delete system list"
                                    description="This action will delete the system list"
                                    content="If you choose to continue the system list will be deleted - this could cause application breaking problems."
                                  />
                                </>
                              }
                            >
                              <FieldArray
                                name={`lists.${index}.values`}
                                render={arrayHelpers => (
                                  <SubPanelContent
                                    SubPanelActions={
                                      <div className="flex justify-end">
                                        <Button content="Add item" buttonType={ButtonType.Tertiary} type="button" action={() => arrayHelpers.push({ short: '', long: '', colour: generateColour() })} />
                                      </div>
                                    }
                                  >
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
                                  </SubPanelContent>
                                )}
                              />
                            </SubPanel>
                          ))}
                        </div>
                      </Panel>
                    )}
                  />
                  <Persist name="systemListCollection" />
                </Form>
              )}
            </Formik>
          ) : (
            <Panel title="System List Collection" hideSave>
              {isLoading ? (
                <SpinnerIcon className="w-6 h-6" />
              ) : (
                error ? (
                  <FetchError error={error} isLoading={isLoading} toggleRefresh={refresh} />
                ) : (
                  <div className="flex justify-center p-10">
                    <button className="font-bold text-xl tracking-wider hover:text-gray-600 transition-colors" type="button" onClick={() => init()}>System list collection has not been created yet, click here to create it</button>
                  </div>
                )
              )}
            </Panel>
          )}
        </>
      )
      }
    />
  )
}

export default memo(SystemListCollectionPanel)