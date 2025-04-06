"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { examSchema, ExamSchemaType } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DatetimePicker } from "@/components/ui/date-time-picker";
import { Button } from "@/components/ui/button";
import { createNewExamAction } from "../actions";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

const NewExamForm = () => {
  const form = useForm<ExamSchemaType>({
    resolver: zodResolver(examSchema),
    defaultValues: {
      title: "",
      description: "",
      passcode: "",
      startTime: new Date(),
      endTime: new Date(),
      duration: 0,
    },
  });

  async function onSubmit(values: ExamSchemaType) {
    const [data, err] = await createNewExamAction(values);

    if (err) {
      toast.error(err.message);
    }

    if (data) {
      toast.success("New Exam Created");
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
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
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Time</FormLabel>
              <FormControl>
                <DatetimePicker
                  {...field}
                  dtOptions={{
                    hour12: false,
                  }}
                  format={[
                    ["days", "months", "years"],
                    ["hours", "minutes"],
                  ]}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Time</FormLabel>
              <FormControl>
                <DatetimePicker
                  {...field}
                  dtOptions={{
                    hour12: false,
                  }}
                  format={[
                    ["days", "months", "years"],
                    ["hours", "minutes"],
                  ]}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Durasi (Menit)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormDescription>
                Durasi ujian dalam menit. Minimal 10 menit
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passcode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Passcode</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className=" w-full"
        >
          {form.formState.isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default NewExamForm;
