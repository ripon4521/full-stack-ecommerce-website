"use client"

import { z } from "zod"
import { Separator } from "../ui/separator";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
    title: z.string().min(2).max(20),
    description: z.string().min(2).max(500).trim(),
    image: z.string(),
})
const CollectionFrom = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          title: "",
          description:"",
          image:"",
        },
      })


      const onSubmit = async (values: z.infer<typeof formSchema>) =>{
    
        console.log(values)
      }





    return (
        <div className="p-5">
            <h1 className="text-3xl font-bold ml-5 mt-5 text-gray-500">Collection From</h1>
            <Separator className="bg-gray-400 my-4"></Separator>

            <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>

        </div>
    );
};

export default CollectionFrom;
