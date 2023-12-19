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
import {
  type AddTeacherRequest,
  AddTeacherSchema,
} from "~/schemas/teacher.schema";
import DatePicker from "~/components/ui/date-picker";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const AddTeacherForm = () => {
  const router = useRouter()
  const form = useForm<AddTeacherRequest>({
    resolver: zodResolver(AddTeacherSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      contactNumber: "",
      dateOfBirth: undefined,
      joiningDate: undefined,
      gender: "male",
      grades: "",
      subjects: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pinCode: "",
    },
  });

  const {
    mutate: addTeacher,
    isLoading,
    isSuccess,
    error,
  } = api.teacher.addTeacher.useMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Teacher created successfully");
      form.reset();
      router.push("/school-admin/teacher/list")
      router.refresh()
    }
    if (error) {
      if (error.data?.code === "CONFLICT") {
        toast.error("Teacher already existed");
      }
      if (error.data?.code === "BAD_REQUEST") {
        toast.error("Please check your input");
      } else {
        toast.error(error.message);
      }
    }
  }, [isSuccess, error]);

  const onSubmit = (values: AddTeacherRequest) => {
    if (!isLoading) {
      addTeacher(values);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <InputGroup>
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabelRequired>First Name</FormLabelRequired>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabelRequired>Last Name</FormLabelRequired>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </InputGroup>

        <InputGroup>
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabelRequired>Date Of Birth</FormLabelRequired>
                <FormControl>
                  <DatePicker field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabelRequired>Gender</FormLabelRequired>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </InputGroup>
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

        <InputGroup>
          <FormField
            control={form.control}
            name="grades"
            render={({ field }) => (
              <FormItem>
                <FormLabelRequired>Grades</FormLabelRequired>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subjects"
            render={({ field }) => (
              <FormItem>
                <FormLabelRequired>Subjects</FormLabelRequired>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="joiningDate"
            render={({ field }) => (
              <FormItem>
                <FormLabelRequired>Joining date</FormLabelRequired>
                <FormControl>
                  <DatePicker field={field} />
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
                <Textarea {...field} />
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
          <FormField
            control={form.control}
            name="pinCode"
            render={({ field }) => (
              <FormItem>
                <FormLabelRequired>Pin code</FormLabelRequired>
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
                  <Input {...field} value={!field.value ? "" : field.value} type="password"/>
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
                  <Input {...field} value={!field.value ? "" : field.value} type="password"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </InputGroup>
        <div className="flex justify-end">
          <Button variant="info" size="lg" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin text-white" />
            ) : null}
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddTeacherForm;
