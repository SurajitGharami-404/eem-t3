import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputGroup from "~/components/input-group";
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
  type SchoolPaymentDetailsRequest,
  SchoolPaymentDetailsSchema,
} from "~/schemas/payment.schema";

const SchoolPaymentDetailsForm = () => {
  const form = useForm<SchoolPaymentDetailsRequest>({
    resolver: zodResolver(SchoolPaymentDetailsSchema),
    defaultValues: {
      name: "",
      email: "",
      contactNumber: "",
      billingDate: undefined,
      expiryDate: undefined,
      paymentAmount: "",
      paymentDate: undefined,
      paymentMode: "",
      transactioId: "",
    },
  });
  return (
    <Form {...form}>
      <form className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabelRequired>School Name</FormLabelRequired>
              <FormControl>
                <Input {...field} disabled />
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
                  <Input {...field} disabled />
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
                  <Input {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </InputGroup>

        <InputGroup>
          <FormField
            control={form.control}
            name="billingDate"
            render={({ field }) => (
              <FormItem>
                <FormLabelRequired>Billing Date</FormLabelRequired>
                <FormControl>
                  <DatePicker field={field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="expiryDate"
            render={({ field }) => (
              <FormItem>
                <FormLabelRequired>Expiry Date</FormLabelRequired>
                <FormControl>
                  <DatePicker field={field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </InputGroup>
        <InputGroup>
          <FormField
            control={form.control}
            name="paymentAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabelRequired>Payment Amount</FormLabelRequired>
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="paymentDate"
            render={({ field }) => (
              <FormItem>
                <FormLabelRequired>Payment Date</FormLabelRequired>
                <FormControl>
                  <DatePicker field={field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </InputGroup>
        <InputGroup>
          <FormField
            control={form.control}
            name="paymentMode"
            render={({ field }) => (
              <FormItem>
                <FormLabelRequired>Payment Mode</FormLabelRequired>
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="transactioId"
            render={({ field }) => (
              <FormItem>
                <FormLabelRequired>Transaction ID</FormLabelRequired>
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </InputGroup>
      </form>
    </Form>
  );
};

export default SchoolPaymentDetailsForm;
