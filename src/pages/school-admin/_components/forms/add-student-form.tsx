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
  type AddStudentRequest,
  AddStudentSchema,
} from "~/schemas/student.schema";
import DatePicker from "~/components/ui/date-picker";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { type Grade } from "@prisma/client";

const AddStudentForm = () => {
  const router = useRouter();

  const [grades, setGrades] = useState<Grade[]>([]);

  const {
    data,
    isSuccess: gradesSuccess,
    error: gradesError,
  } = api.grade.findAllGrades.useQuery();

  useEffect(() => {
    if (gradesSuccess) {
      setGrades(data);
    }
    if (gradesError) {
      toast.error(gradesError.data?.code);
    }
  }, [data, grades, gradesSuccess, gradesError]);

  const form = useForm<AddStudentRequest>({
    resolver: zodResolver(AddStudentSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      contactNumber: "",
      dateOfBirth: undefined,
      admissionDate: undefined,
      grade: "",
      rollNumber: 0,
      gender: "male",
      guardianName: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pinCode: "",
    },
  });

  const {
    mutate: addStudent,
    isLoading,
    isSuccess,
    error,
  } = api.student.addStudent.useMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Student created successfully");
      form.reset();
      router.push("/school-admin/student/list");
    }
    if (error) {
      if (error.data?.code === "CONFLICT") {
        toast.error("Student already existed");
      }
      if (error.data?.code === "BAD_REQUEST") {
        toast.error("Plase check your input");
      } else {
        toast.error(error.message);
      }
    }
  }, [isSuccess, error]);

  const onSubmit = (values: AddStudentRequest) => {
    addStudent(values);
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

        <FormField
          control={form.control}
          name="guardianName"
          render={({ field }) => (
            <FormItem>
              <FormLabelRequired>Guardian Name</FormLabelRequired>
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="others">Others</SelectItem>
                  </SelectContent>
                </Select>
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
            name="grade"
            render={({ field }) => (
              <FormItem>
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
                    {grades.map((grade) => (
                      <SelectItem value={grade.id}>{grade.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rollNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabelRequired>Roll Number</FormLabelRequired>
                <FormControl>
                  <Input {...field} onChange={(e)=>field.onChange(Number(e.target.value))} type="number"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="admissionDate"
            render={({ field }) => (
              <FormItem>
                <FormLabelRequired>Admission date</FormLabelRequired>
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

export default AddStudentForm;
