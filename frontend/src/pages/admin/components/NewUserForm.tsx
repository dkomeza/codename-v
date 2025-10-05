import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUser } from "@shared/api/admin";
import { NewUserSchema } from "@shared/schemas/admin.schema";
import { useForm } from "react-hook-form";
import { z } from "zod";

type NewUserFormProps = {
  fetchData: () => void;
};

function NewUserForm(props: NewUserFormProps) {
  const form = useForm<z.infer<typeof NewUserSchema>>({
    resolver: zodResolver(
      NewUserSchema.extend({
        birthDate: z.date(),
      })
    ),
    defaultValues: {
      email: "asdf@sadf.asdf",
      name: "Jan",
      surname: "Kowalski",
      password: "passwordasdf1A",
      type: "VOLUNTEER",
      birthDate: new Date(),
    },
  });

  async function handleFormSubmit(data: z.infer<typeof NewUserSchema>) {
    try {
      await createUser({ ...data, token: localStorage.getItem("authToken") || "" });
    } catch (e) {
      console.error("Failed to create user:", e);
    }

    form.reset();
    props.fetchData();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)}>
        <DialogTrigger asChild>
          <Button className="cursor-pointer">Dodaj użytkownika</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Dodaj użytkownika</DialogTitle>
            <DialogDescription>Podaj dane użytkownika.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Imię</FormLabel>
                    <FormControl>
                      <Input placeholder="Imię" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="surname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nazwisko</FormLabel>
                    <FormControl>
                      <Input placeholder="Nazwisko" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hasło</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Hasło" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data urodzenia</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      value={field.value.toISOString().split("T")[0]} // Formatowanie daty do YYYY-MM-DD
                      onChange={(e) => field.onChange(new Date(e.target.value))} // Konwersja z powrotem na obiekt Date
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="type">Typ</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Wybierz typ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Typy</SelectLabel>
                          <SelectItem value="ADMIN">Administrator</SelectItem>
                          <SelectItem value="COORDINATOR">Koordynator</SelectItem>
                          <SelectItem value="VOLUNTEER">Wolontariusz</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">
                Anuluj
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type="submit"
                className="cursor-pointer"
                disabled={!form.formState.isValid}
                onClick={() => form.handleSubmit(handleFormSubmit)()}
              >
                Zapisz
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Form>
  );
}

export default NewUserForm;
