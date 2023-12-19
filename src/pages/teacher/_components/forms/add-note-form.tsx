import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputGroup from "~/components/input-group";
import { Button } from "~/components/ui/button";
import DatePicker from "~/components/ui/date-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabelRequired,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { type AddNoteRequest, AddNoteSchema } from "~/schemas/note.schema";

const AddNoteForm = () => {
  const form = useForm<AddNoteRequest>({
    resolver: zodResolver(AddNoteSchema),
    defaultValues: {
      name: "",
      subject: "",
      grade: "",
      date: undefined,
      note: "",
      attachment: undefined,
    },
  });
  return (
    <Form {...form}>
      <form className="space-y-6">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabelRequired>Topic Name</FormLabelRequired>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <InputGroup>
          <FormField
            name="subject"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabelRequired>Subject</FormLabelRequired>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="social science">
                      Social science
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="grade"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabelRequired>Grade</FormLabelRequired>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Grade" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="6">6</SelectItem>
                    <SelectItem value="7">7</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </InputGroup>
        <InputGroup>
          <FormField
            name="date"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabelRequired>Date</FormLabelRequired>
                <FormControl>
                  <DatePicker field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="attachment"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabelRequired>Attachment</FormLabelRequired>
                <FormControl>
                  <Input
                    ref={field.ref}
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {
                      const target = e.target as HTMLInputElement;
                      const files = target?.files;

                      if (files?.length) {
                        return field.onChange(files[0]);
                      }
                      return field.onChange(undefined);
                    }}
                    className="cursor-pointer"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </InputGroup>

        <FormField
          name="note"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabelRequired>Write your notes here</FormLabelRequired>
              <FormControl>
                <Textarea {...field} className="h-[30ch] resize-none" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" variant="info" size="lg">
            Upload
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddNoteForm;
