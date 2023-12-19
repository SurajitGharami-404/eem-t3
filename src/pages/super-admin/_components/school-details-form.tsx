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
  type SchoolDetailsRequest,
  SchoolDetailsSchema,
} from "~/schemas/school.schema";

import { cn } from "~/lib/utils";
import { useState } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type Details = {
  id?: string;
  name: string;
  email: string;
  contactNumber: string;
  address: string;
  city: string | null;
  state: string | null;
  country: string | null;
  pinCode: string;
};

const SchoolDetailsForm = ({ defaultValues }: { defaultValues: Details }) => {
  const [edit, setEdit] = useState<boolean>(false);

  const router = useRouter();

  const form = useForm<SchoolDetailsRequest>({
    resolver: zodResolver(SchoolDetailsSchema),
    defaultValues,
  });

  const onSubmit = (values: SchoolDetailsRequest) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  };

  const handleResetForm = () => {
    form.reset();
    setEdit(false);
  };

  const { mutate: deleteSchool, isLoading } =
    api.school.deleteSchoolByIdHandler.useMutation({
      onSuccess() {
        router.push("/super-admin/dashboard");
      },

      onError(error) {
        toast.error(error.data?.code);
      },
    });

  const handleSchoolDelete = async () => {
    if (defaultValues.id) {
      if (!isLoading) {
        deleteSchool({
          id: defaultValues.id,
        });
      }
    }
  };

  return (
    <>
      <div className="flex justify-end gap-x-4">
        <Button
          type="submit"
          form="edit-school-form"
          variant="info"
          className={cn("hidden", edit && "inline-flex")}
          size="lg"
        >
          Save
        </Button>
        <Button
          type="button"
          variant="info"
          onClick={() => setEdit(true)}
          className={cn("hidden", !edit && "inline-flex")}
          size="lg"
        >
          Edit
        </Button>
        <Button
          type="button"
          variant="destructive"
          className={cn("hidden", edit && "inline-flex")}
          size="lg"
          onClick={handleResetForm}
        >
          Cancel
        </Button>
        <Button
          type="button"
          variant="destructive"
          className={cn("hidden", !edit && "inline-flex")}
          size="lg"
          onClick={handleSchoolDelete}
        >
          Delete
        </Button>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
          id="edit-school-form"
        >
          {/**
           * Form Buttons
           * @edit_button to set input disable field
           * @delete_button to delete particular school
           * @cancel_button to reset the form
           * @save_button to submit the form
           */}

          {/**
           * @react_hook_form
           */}

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabelRequired>School Name</FormLabelRequired>
                <FormControl>
                  <Input {...field} disabled={!edit} />
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
                    <Input {...field} disabled={!edit} />
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
                    <Input {...field} disabled={!edit} />
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
                  <Textarea
                    {...field}
                    className="min-h-[10rem] resize-none"
                    disabled={!edit}
                  />
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
                    <Input
                      {...field}
                      value={!field.value ? "" : field.value}
                      disabled={!edit}
                    />
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
                    <Input
                      {...field}
                      value={!field.value ? "" : field.value}
                      disabled={!edit}
                    />
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
                    <Input {...field} disabled={!edit} />
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
                    <Input
                      {...field}
                      value={!field.value ? "" : field.value}
                      disabled={!edit}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </InputGroup>
        </form>
      </Form>
    </>
  );
};

export default SchoolDetailsForm;
