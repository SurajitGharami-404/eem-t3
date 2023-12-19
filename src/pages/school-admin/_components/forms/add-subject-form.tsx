import { zodResolver } from "@hookform/resolvers/zod";
import { SubjectType } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "~/components/ui/button";
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
import {
  type AddSubjectRequest,
  AddSubjectSchema,
} from "~/schemas/subject.schema";
import { api } from "~/utils/api";

const AddSubjectForm = () => {
  const router = useRouter()
  const form = useForm<AddSubjectRequest>({
    resolver: zodResolver(AddSubjectSchema),
    defaultValues: {
      name: "",
      type: SubjectType.THEORY,

    },
  });

  const {
    mutate: addSubject,
    isLoading,
    isSuccess,
    error,
  } = api.subject.addSubject.useMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Subject created successfully");
      form.reset();
      router.refresh()
    }
    if (error) {
      if (error.data?.code === "CONFLICT") {
        toast.error("Subject already existed");
      }
      if (error.data?.code === "BAD_REQUEST") {
        toast.error("Plase check your input");
      } else {
        toast.error(error.message);
      }
    }
  }, [isSuccess, error]);

  const onSubmit = (values: AddSubjectRequest) => {
    if (!isLoading) {
      addSubject(values);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabelRequired>Subject name</FormLabelRequired>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabelRequired>Subject type</FormLabelRequired>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={SubjectType.THEORY}>Theory</SelectItem>
                  <SelectItem value={SubjectType.PRACTICAL}>
                    Practical
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="info" size="lg" className="float-right">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin text-white" />
          ) : null}
          Save
        </Button>
      </form>
    </Form>
  );
};

export default AddSubjectForm;
