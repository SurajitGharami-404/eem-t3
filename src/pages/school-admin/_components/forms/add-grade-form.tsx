import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "~/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabelRequired, FormMessage } from "~/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { type AddGradeRequest, AddGradeSchema } from "~/schemas/grade.schema";
import { api } from "~/utils/api";

const AddGradeForm= () => {

  const router = useRouter()
    const form = useForm<AddGradeRequest>({
        resolver:zodResolver(AddGradeSchema),
        defaultValues:{
            class:"",
            section:"",
        }
    })

    const {mutate:addGrade,isLoading} = api.grade.addGrade.useMutation({
      onSuccess(data) {
        toast.success(`${data} added successfully`)
        form.reset()
        router.refresh()
      },

      onError(error){
        toast.error(error.data?.code)
      }
    })

    const handleAdd = (values:AddGradeRequest)=>{
      addGrade(values)
    }

    const classes = ['1','2','3','4','5','6','7','8','9','10','11','12']
    const sections = ['A','B','C','D','E','F']

  return (
    <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(handleAdd)}>
            <FormField
              control={form.control}
              name="class"
              render={({ field }) => (
                <FormItem>
                  <FormLabelRequired>Class</FormLabelRequired>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {
                    classes.map((idx)=>(
                      <SelectItem value={idx}>{idx}</SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="section"
              render={({ field }) => (
                <FormItem>
                  <FormLabelRequired>Section</FormLabelRequired>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Section" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {
                    sections.map((idx)=>(
                      <SelectItem value={idx}>{idx}</SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          <Button variant="info" size="lg" className="float-right" disabled={isLoading}>Save</Button>
        </form>
    </Form>
  )
}

export default AddGradeForm;