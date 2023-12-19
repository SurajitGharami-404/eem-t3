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
import { type AddRequestRequest, AddRequestSchema } from "~/schemas/request.schema";

const AddRequestForm = () => {
  const form = useForm<AddRequestRequest>({
    resolver: zodResolver(AddRequestSchema),
    defaultValues: {
      subject: "",
      startingDate: undefined,
      endingDate: undefined,
      message: "",
      attachment: undefined,
    },
  });
  return (
    <Form {...form}>
      <form className="space-y-6">
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
        <InputGroup>
          <FormField
            name="startingDate"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabelRequired>Starting Date</FormLabelRequired>
                <FormControl>
                  <DatePicker field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="endingDate"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabelRequired>Ending Date</FormLabelRequired>
                <FormControl>
                  <DatePicker field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
        </InputGroup>
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
        <FormField
          name="message"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabelRequired>Write your message here</FormLabelRequired>
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

export default AddRequestForm;
