import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormLabelRequired,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import InputGroup from "~/components/input-group";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import {
  type AddSchoolRequest,
  AddSchoolSchema,
} from "~/schemas/school.schema";
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

const AddSchoolForm = () => {
  const form = useForm<AddSchoolRequest>({
    resolver: zodResolver(AddSchoolSchema),
    defaultValues: {
      name: "",
      email: "",
      contactNumber: "",
      address: "",
      city:"",
      state:"",
      country:"",
      pinCode:"",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate: addSchool, isSuccess, error, isLoading } = api.school.addSchool.useMutation();

  useEffect(()=>{
    if(isSuccess){
      toast.success("School created successfully");
      form.reset()
    }
    if(error){
      if(error.data?.code==="CONFLICT"){
        toast.error("School already existed")
      }
      if(error.data?.code==="BAD_REQUEST"){
        toast.error("Plase check your input")
      }
      else{
        toast.error(error.message)
      }
    }
  },[isSuccess, error])

  const handleAddSchool = (values: AddSchoolRequest) =>{
    if(!isLoading){
      addSchool({
        ...values,
        image:null
      })
    }
  }

  return (
    <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(handleAddSchool)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabelRequired>School Name</FormLabelRequired>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <InputGroup>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabelRequired>Email</FormLabelRequired>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabelRequired>Contact Number</FormLabelRequired>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </InputGroup>

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabelRequired>Address</FormLabelRequired>
                <FormControl>
                  <Textarea {...field} className="resize-none" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <InputGroup>
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} value={!field.value ? "" : field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input {...field} value={!field.value ? "" : field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </InputGroup>
          <InputGroup>
          <FormField
              control={form.control}
              name="pinCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabelRequired>Pin Code</FormLabelRequired>
                  <FormControl>
                    <Input {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input {...field} value={!field.value ? "" : field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </InputGroup>
          <InputGroup>
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabelRequired>Password</FormLabelRequired>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabelRequired>Confirm Password</FormLabelRequired>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </InputGroup>


          <div className="flex justify-end">
            <Button type="submit" variant="info">
              {
                isLoading?<Loader2 className="h-4 w-4 text-white animate-spin"/>:null
              }
              Submit
            </Button>
          </div>
        </form>
      </Form>
  );
};

export default AddSchoolForm;
