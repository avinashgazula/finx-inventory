"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { createVehicleAction } from "../(actions)/createVehicleAction";
import { editVehicleAction } from "../(actions)/editVehicleAction";
import { Vehicle } from "./models/Vehicle";
import { vehicleSchema } from "./schemas/VehicleSchema";

type VehicleFormData = z.infer<typeof vehicleSchema>;

const VehicleForm = ({ vehicle }: { vehicle?: Vehicle }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  type Condition = "new" | "used";
  type Status = "in-stock" | "pending" | "sold";

  const form = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      make: vehicle?.make ?? "",
      model: vehicle?.model ?? "",
      year: vehicle?.year ?? undefined,
      price: vehicle?.price ?? undefined,
      vin: vehicle?.vin ?? "",
      condition: (vehicle?.condition as Condition) ?? "used",
      mileage: vehicle?.mileage ?? undefined,
      status: (vehicle?.status as Status) ?? "in-stock",
      photo_url: vehicle?.photo_url ?? "",
    },
  });

  const onSubmit = async (values: VehicleFormData) => {
    setIsSubmitting(true);
    try {
      const formattedValues = {
        ...values,
        year: Number(values.year),
        price: Number(values.price),
        mileage: Number(values.mileage),
      };
      let result: { success: boolean; error?: string };
      if (vehicle && vehicle.id) {
        result = await editVehicleAction(vehicle?.id, formattedValues);
        if (!result.success) {
          toast.error(result.error);
        } else {
          toast.success("Vehicle updated successfully");
          router.push("/inventory");
          router.refresh();
        }
      } else {
        result = await createVehicleAction(formattedValues);
        if (!result.success) {
          toast.error(result.error);
          toast.success("Vehicle created successfully");
          router.push("/inventory");
          router.refresh();
        }
      }

      if (!result.success) {
        throw new Error(result.error);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create vehicle"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-180 pl-2 overflow-scroll">
      <Card>
        <CardHeader>
          <CardTitle>Vehicle Details</CardTitle>
          <CardDescription>
            {vehicle ? "Update the vehicle information" : "Add a new vehicle"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
                <FormField
                  control={form.control}
                  name="make"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Make</FormLabel>
                      <FormControl>
                        <Input placeholder="Toyota" {...field} />
                      </FormControl>
                      <FormDescription>Vehicle manufacturer</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Model</FormLabel>
                      <FormControl>
                        <Input placeholder="Camry" {...field} />
                      </FormControl>
                      <FormDescription>Vehicle model</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="2015"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value)}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormDescription>Manufacturing year</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="30000"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value)}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormDescription>Price in CAD</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mileage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mileage</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="50000"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value)}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormDescription>Mileage in kilometers</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="vin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>VIN</FormLabel>
                      <FormControl>
                        <Input placeholder="1HGBH41JXMN109186" {...field} />
                      </FormControl>
                      <FormDescription>
                        Vehicle identification number
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="condition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Condition</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value || undefined}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select condition" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="used">Used</SelectItem>
                          <SelectItem value="new">New</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Vehicle condition</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value || undefined}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="in-stock">In Stock</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="sold">Sold</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Inventory status</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="photo_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Photo URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://placehold.co/600x400"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Only images from upload.wikimedia.org are allowed
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    router.push("/inventory");
                    router.refresh();
                  }}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>{vehicle ? "Updating..." : "Creating..."}</span>
                    </div>
                  ) : vehicle ? (
                    "Update Vehicle"
                  ) : (
                    "Add Vehicle"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VehicleForm;
