import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputGroup from "~/components/input-group";
import { Button } from "~/components/ui/button";
import DatePicker from "~/components/ui/date-picker";
import { Form, FormControl, FormField, FormItem, FormLabel, FormLabelRequired, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { type SchoolAccountDetailsRequest, SchoolAccountDetailsSchema } from "~/schemas/account.schema";



const SchoolAccountDetailsForm= () => {
    const form = useForm<SchoolAccountDetailsRequest>({
        resolver:zodResolver(SchoolAccountDetailsSchema),
        defaultValues:{
            name:"",
            email:"",
            contactNumber:"",
            billingDate:undefined,
            expiryDate:undefined,
            paymentAmount:"",
            invoice:undefined
        }
    })
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
                  <Input {...field} disabled/>
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
                    <Input {...field} disabled/>
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
                    <Input {...field} disabled/>
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
                   <DatePicker field={field} disabled/>
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
                   <DatePicker field={field} disabled/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </InputGroup>
          <FormField
              control={form.control}
              name="paymentAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabelRequired>Payment Amount</FormLabelRequired>
                  <FormControl>
                   <Input {...field} disabled/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          <FormField
              name="invoice"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Invoice</FormLabel>
                  <FormControl>
                    <Input
                      name={field.name}
                      ref={field.ref}
                      type="file"
                      accept="pdf"
                      onChange={(e) => {
                        if (e.target.files?.length) {
                          return field.onChange(e.target.files[0]);
                        }
                        return field.onChange(null);
                      }}
                      className="cursor-pointer"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          <div dir="rtl">
            <Button
              type="submit"
              variant="info"
              size="lg"
              className="gap-2"
            //   disabled={isLoading}
            >
              {/* {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : null} */}
              Send Notification
            </Button>
          </div>
        </form>
        </Form>
  )
}

export default SchoolAccountDetailsForm;