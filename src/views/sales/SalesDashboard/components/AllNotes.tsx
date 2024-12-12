import React, { useState } from "react";
import SingleNote from "./SingleNote";
import { FormContainer, FormItem } from "@/components/ui/Form";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import DatePicker from "@/components/ui/DatePicker";
import { Field, Form, Formik, FieldProps } from "formik";
import Dialog from "@/components/ui/Dialog";
import { useAppSelector, useAppDispatch, addNewNote } from "../store";
import * as Yup from "yup";
import moment from "moment";

const AllNotes = () => {
  const dispatch = useAppDispatch();
  const allNotes = useAppSelector((state) => state.salesDashboard.data.notes);
  const [open, isOpen] = useState(false);

  const handleOpenDialog = () => isOpen(true);

  const handleDialogClose = () => {
    isOpen(false);
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Note title Required"),
    description: Yup.string().required("Note Description Required"),
  });

  return (
    <div className="flex justify-start items-center flex-col h-full">
      <button
        className="bg-blue-500 hover:bg-gray-400 text-white-800 py-2 px-4 rounded inline-flex items-center"
        onClick={handleOpenDialog}
      >
        <span>+ Create New Note</span>
      </button>
      <div className="overflow-y-auto h-5/6 w-full mt-5">
        {allNotes?.filter((note: any) => note.status === 'active')?.map((note: any) => (
          <SingleNote key={note?.id} {...note} />
        ))}
      </div>
      <Dialog
        isOpen={open}
        onClose={handleDialogClose}
        onRequestClose={handleDialogClose}
      >
        <div>
          <Formik
            enableReinitialize
            initialValues={{
              title: "",
              description: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              const noteId = "id" + Math.random().toString(16).slice(2);
              dispatch(
                addNewNote({
                  ...values,
                  id: noteId,
                  createdAt: moment().format("Do MMM YYYY"),
                  tags: ["React"],
                  status: 'active'
                })
              );
              handleDialogClose();
            }}
          >
            {({ values, touched, errors }) => (
              <>
                <Form>
                  <FormContainer>
                    <FormItem
                      label="Note Title"
                      invalid={errors.title && touched.title}
                      errorMessage={errors.title}
                    >
                      <Field
                        type="text"
                        autoComplete="off"
                        name="title"
                        placeholder="Please enter title"
                        component={Input}
                      />
                    </FormItem>
                    <FormItem
                      label="Note Description"
                      invalid={errors.description && touched.description}
                      errorMessage={errors.description}
                    >
                      <Field
                        type="text"
                        autoComplete="off"
                        name="description"
                        placeholder="Please enter note description"
                        component={Input}
                      />
                    </FormItem>
                    <FormItem className="mb-0 text-right rtl:text-left">
                      <Button variant="solid" type="submit" disabled={(!values.description || !values.title)}>
                        Add Note
                      </Button>
                    </FormItem>
                  </FormContainer>
                </Form>
              </>
            )}
          </Formik>
        </div>
      </Dialog>
    </div>
  );
};

export default AllNotes;
