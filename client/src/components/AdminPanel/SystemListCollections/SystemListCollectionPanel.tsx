import { PlusIcon } from "@heroicons/react/solid"
import { FieldArray, Form, Formik } from "formik"
import { Persist } from 'formik-persist'
import { memo, useState } from "react"
import { useFetch, useRequestBuilder, useListCollectionService, useRefresh } from "../../../hooks"
import { ButtonType, IFetch, IList, IListCollection, IListValue } from "../../../models"
import { generateColour } from "../../../services"
import { endpoints } from "../../../utilities"
import { Button, DeleteDialog, Fetch } from "../../Common"
import { EditableSubPanelTitle, ListItem, Panel, SubPanel, SubPanelContent } from ".."

const SystemListCollectionPanel = () => {

  const { requestBuilder } = useRequestBuilder()
  const { dependency, refresh } = useRefresh()
  const listCollectionService = useListCollectionService(refresh)

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const toggleDeleteDialogOpen = () => setDeleteDialogOpen(!deleteDialogOpen)

  return (
    <Fetch
      fetchOutput={useFetch(endpoints.systemlistcollections, requestBuilder(), [dependency], false)}
      render={({ response, isLoading }: IFetch<IListCollection>) => (
        <>
          {!isLoading && response && (
            <Formik
              initialValues={response}
              onSubmit={(values) => {
                listCollectionService.update(response._id, values)
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
                                  <Button type="button" buttonType={ButtonType.Cancel} content="Delete" action={() => toggleDeleteDialogOpen()} />
                                  <DeleteDialog dialogOpen={deleteDialogOpen} toggleDialogOpen={toggleDeleteDialogOpen} itemType="system list" deleteAction={() => arrayHelpers.remove(index)} />
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
          )}
        </>
      )
      }
    />
  )
}

export default memo(SystemListCollectionPanel)