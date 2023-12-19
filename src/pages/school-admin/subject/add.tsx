import { layout } from "~/components/layouts/layout";
import Heading from "~/components/heading";
import { DataTable } from "~/components/ui/data-table";
import { subjectColumns } from "../_components/tables/subject/columns";
import { api } from "~/utils/api";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubjectType } from "@prisma/client";
import { Loader2 } from "lucide-react";
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
import { useRouter } from "next/navigation";
import SubjectTable from "../_components/tables/subject/subject-table";




const AddSubjectPage = () => {

  const router = useRouter()

  const [data,setData] = useState<unknown[]>([])

  const {
    mutate: addSubject,
    isLoading:addSubjectLoading,
  } = api.subject.addSubject.useMutation(
    {
      onSuccess(data) {
        toast.success(`${data} added successfully`)
        form.reset()
        router.refresh()
      },
    }
  );

  
  const {data:subjects, isSuccess, error} = api.subject.findAllSubjects.useQuery()
  useEffect(() => {
    if (isSuccess) {
      setData(subjects)
    }
    if (error) {
      toast.error(error?.data?.code)
    }
  }, [isSuccess,error,data,subjects,addSubject]);




  const form = useForm<AddSubjectRequest>({
    resolver: zodResolver(AddSubjectSchema),
    defaultValues: {
      name: "",
      type: SubjectType.THEORY,
    },
  });

  
  const onSubmit = (values: AddSubjectRequest) => {
      addSubject(values);
  };


  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-5 space-y-3 rounded-md bg-background p-4 shadow">
          <Heading type="h1">Add Subject</Heading>
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
          {addSubjectLoading ? (
            <Loader2 className="h-4 w-4 animate-spin text-white" />
          ) : null}
          Save
        </Button>
      </form>
    </Form>
        </div>
        <div className="col-span-7 space-y-3 rounded-md bg-background p-4 shadow">
          <Heading type="h2">Subject List</Heading>
          <SubjectTable columns={subjectColumns} data={data}/>
        </div>
      </div>
    </>
  );
};

AddSubjectPage.getLayout = (AddSubjectPage: React.ReactElement) =>
  layout(AddSubjectPage, "SchoolAdmin");

export default AddSubjectPage;