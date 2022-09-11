import React from "react";
import Head from "next/head";
import type { NextPage } from "next";

// Import from dep
import {
  Box,
  Card,
  Grid,
  Button,
  MenuItem,
  TextField,
  CardContent,
} from "@mui/material";
import { useForm, useFieldArray } from "react-hook-form";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd";

// Import from local
import { AppBarLayout } from "../src/Components";
import { optionsDropdown } from "../src/Definitions";

type FormValues = {
  questions: {
    question: string;
    rule: "unrequired" | "required";
  }[];
};

const Home: NextPage = () => {
  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onBlur",
  });

  const { fields, append, remove, prepend, move } = useFieldArray({
    control,
    name: "questions",
  });

  const [val, setVal] = React.useState(0);
  const [isSubmitButtonShow, setIsSubmitButtonShow] = React.useState(false);

  React.useEffect(() => {
    setVal((val) => val + 1);
    if (val === 0) {
      prepend(JSON.parse(localStorage.getItem("questions") as any));
    }
  }, []);

  const watchQuestions = watch("questions");

  const onSubmit = (data: FormValues) => console.log(data);

  const handleDrag = ({ source, destination }: any) => {
    if (destination) {
      move(source.index, destination.index);
      setIsSubmitButtonShow(true);
    }
  };

  return (
    <>
      <Head>
        <title>Survey Questions</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <AppBarLayout>
        <>
          {/* Form Region */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <DragDropContext onDragEnd={handleDrag}>
              <Droppable droppableId="droppable-question">
                {(provided: any) => (
                  <Box ref={provided.innerRef} {...provided.droppableProps}>
                    {fields.map((item, index) => (
                      <Draggable
                        draggableId={`item-${index}`}
                        index={index}
                        key={`test[${index}]`}
                      >
                        {(provided2: any) => (
                          <Card
                            key={item.id}
                            ref={provided2.innerRef}
                            {...provided2.draggableProps}
                            sx={{ mb: 3, ":hover": { cursor: "pointer" } }}
                            onClick={() => {
                              setIsSubmitButtonShow(true);
                            }}
                          >
                            <CardContent>
                              <Grid container spacing={2}>
                                <Grid
                                  item
                                  xs={12}
                                  {...provided2.dragHandleProps}
                                  sx={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    ":hover": { cursor: "pointer" },
                                  }}
                                >
                                  <Box sx={{ transform: "rotate(90deg)" }}>
                                    <DragIndicatorIcon />
                                  </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                  <TextField
                                    {...register(
                                      `questions.${index}.question` as any,
                                      {
                                        required: true,
                                      }
                                    )}
                                    value={watch(`questions.${index}.question`)}
                                    fullWidth
                                    id="filled-basic"
                                    label="Question"
                                    variant="filled"
                                  />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                  <TextField
                                    fullWidth
                                    id="outlined-select-optionsRule"
                                    select
                                    label="Rule"
                                    value={watch(`questions.${index}.rule`)}
                                    {...register(
                                      `questions.${index}.rule` as any,
                                      {
                                        required: true,
                                      }
                                    )}
                                  >
                                    {optionsDropdown.map((option) => (
                                      <MenuItem
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </MenuItem>
                                    ))}
                                  </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                  <TextField
                                    fullWidth
                                    id="filled-basic"
                                    label="Answer"
                                    variant="standard"
                                    disabled
                                  />
                                </Grid>
                                <Grid item xs={12}>
                                  {isSubmitButtonShow && (
                                    <Button
                                      sx={{ mb: 1 }}
                                      onClick={() => remove(index)}
                                      variant="contained"
                                      color="error"
                                      fullWidth
                                    >
                                      Delete
                                    </Button>
                                  )}
                                </Grid>
                              </Grid>
                            </CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </DragDropContext>
            <Button
              sx={{ mb: 2 }}
              type="submit"
              variant="contained"
              fullWidth
              onClick={() => {
                append({
                  question: "",
                  rule: "unrequired",
                });
                setIsSubmitButtonShow(true);
              }}
            >
              Add Question
            </Button>
            {isSubmitButtonShow && (
              <Button
                color="success"
                variant="contained"
                fullWidth
                onClick={() => {
                  localStorage.setItem(
                    "questions",
                    JSON.stringify(watchQuestions)
                  );
                  setIsSubmitButtonShow(false);
                }}
              >
                Submit
              </Button>
            )}
          </form>
        </>
      </AppBarLayout>
    </>
  );
};

export default Home;
