import Box from "~/components/box";
import Heading from "~/components/heading";
import { layout } from "~/components/layouts/layout";
import AddNoteForm from "../_components/forms/add-note-form";

const AddNotePage= () => {
  return (
    <>
    <Heading type="h1">Add Note</Heading>
    <Box>
        <AddNoteForm/>
    </Box>
    </>
  )
}
AddNotePage.getLayout = (AddNotePage: React.ReactElement) =>
  layout(AddNotePage, "Teacher");
export default AddNotePage;