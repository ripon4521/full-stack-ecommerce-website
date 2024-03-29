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
import { Textarea } from "../ui/textarea";
import ImageUpload from "../customUi/ImageUpload";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
// import { useRouter } from 'next/router';



const formSchema = z.object({
    title: z.string().min(2).max(20),
    description: z.string().min(2).max(500).trim(),
    image: z.string(),
})
const CollectionFrom = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            image: "",
        },
    })


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
          setLoading(true);
       
          const res = await fetch("/api/collections", {
            method: "POST",
            body: JSON.stringify(values),
          });
          if (res.ok) {
            setLoading(false);
            toast.success(`Collection  created`);
            // window.location.href = "/collections";
            router.push("/collections");
          }
        } catch (err) {
          console.log("[collections_POST]", err);
          toast.error("Something went wrong! Please try again.");
        }
      };





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
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Title" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Description" {...field} rows={5}></Textarea>

                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image</FormLabel>
                                <FormControl>
                                    <ImageUpload value={field.value ? [field.value] : []} onChange={(url) => field.onChange(url)} onRemove={() => field.onChange("")} ></ImageUpload>

                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex gap-5">
                    <Button type="submit">Submit</Button>
                    <Button
                        type="button"
                        onClick={() => router.push("/collections")}
                        
                    >
                        Discard
                    </Button>
                    </div>
                </form>
            </Form>

        </div>
    );
};

export default CollectionFrom;
