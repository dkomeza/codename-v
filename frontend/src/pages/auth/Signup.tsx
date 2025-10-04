import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EmailRounded,
  KeyRounded,
  PersonRounded,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, { message: "Hasło musi mieć conajmniej 8 znaków" })
  .max(128, { message: "Hasło może mieć maksymalnie 128 znaków" })
  .regex(/[A-Z]/, "Hasło musi zawierać przynajmniej jedną wielką literę")
  .regex(/[a-z]/, "Hasło musi zawierać przynajmniej jedną małą literę")
  .regex(/[0-9]/, "Hasło musi zawierać przynajmniej jedną cyfrę")
  .refine((s) => !/\s/.test(s), "Hasło nie może zawierać spacji");

const registerSchema = z
  .object({
    name: z.string().min(2, { message: "Imię musi mieć conajmniej 2 znaki" }),
    surname: z.string().min(2, { message: "Nazwisko musi mieć conajmniej 2 znaki" }),
    password: passwordSchema,
    confirmPassword: z.string().min(1, { message: "Potwierdź hasło" }),
    email: z.email({
      error: "Podaj poprawny adres email",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Hasła muszą być takie same",
  });

type TabProps = {
  form: ReturnType<typeof useForm<z.infer<typeof registerSchema>>>;
  setTab: (tab: (typeof tabs)[number]) => void;
};
function InfoTab({ form, setTab }: TabProps) {
  useEffect(() => {
    console.log("touched", form.formState.touchedFields);
  }, [form]);

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="gap-1">
              <FormLabel className="ml-4 text-sm text-muted-foreground font-normal">imię</FormLabel>
              <FormControl>
                <InputGroup className="rounded-full bg-white px-2 h-auto">
                  <InputGroupInput
                    className="py-3 shrink-0 h-auto"
                    {...field}
                    onBlur={() => form.trigger("name")}
                  />
                  <InputGroupAddon>
                    <PersonRounded className="h-4 w-4 text-[#D85773]" />
                  </InputGroupAddon>
                </InputGroup>
              </FormControl>
              <FormMessage className="text-sm font-light ml-4" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="surname"
          render={({ field }) => (
            <FormItem className="gap-1">
              <FormLabel className="ml-4 text-sm text-muted-foreground font-normal">
                nazwisko
              </FormLabel>
              <FormControl>
                <InputGroup className="rounded-full bg-white px-2 h-auto">
                  <InputGroupInput
                    className="py-3 shrink-0 h-auto"
                    {...field}
                    onBlur={() => form.trigger("surname")}
                  />
                  <InputGroupAddon>
                    <PersonRounded className="h-4 w-4 text-[#D85773]" />
                  </InputGroupAddon>
                </InputGroup>
              </FormControl>
              <FormMessage className="text-sm font-light ml-4" />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem className="gap-1">
            <FormLabel className="ml-4 text-sm text-muted-foreground font-normal">
              adres email
            </FormLabel>
            <FormControl>
              <InputGroup className="rounded-full bg-white px-2 h-auto">
                <InputGroupInput
                  className="py-3 shrink-0 h-auto"
                  {...field}
                  onBlur={() => form.trigger("email")}
                />
                <InputGroupAddon>
                  <EmailRounded className="h-4 w-4 text-[#D85773]" />
                </InputGroupAddon>
              </InputGroup>
            </FormControl>
            <FormMessage className="text-sm font-light ml-4" />
          </FormItem>
        )}
      />
      <Button
        className="py-3 h-auto mt-6 w-full rounded-full bg-gradient-to-br from-[#D85773] to-[#B94357] shadow-xl text-xl font-semibold cursor-pointer"
        onClick={async () => {
          setTab("password");
        }}
        disabled={
          !!form.formState.errors.name ||
          !!form.formState.errors.surname ||
          !!form.formState.errors.email ||
          !form.getValues().name ||
          !form.getValues().surname ||
          !form.getValues().email
        }
      >
        Dalej
      </Button>
    </div>
  );
}

function PasswordTab({ form, setTab }: TabProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem className="gap-1">
            <FormLabel className="ml-4 text-sm text-muted-foreground font-normal">
              hasło (min. 8 znaków, wielka litera i cyfra)
            </FormLabel>
            <FormControl>
              <InputGroup className="rounded-full bg-white pl-2 pr-3 h-auto">
                <InputGroupInput
                  className="py-3 shrink-0 h-auto"
                  {...field}
                  type={showPassword ? "text" : "password"}
                  onBlur={() => form.trigger("password")}
                />
                <InputGroupAddon>
                  <KeyRounded className="h-4 w-4 text-[#D85773]" />
                </InputGroupAddon>
                <InputGroupAddon
                  className="cursor-pointer select-none text-[#D85773] h-4 w-4"
                  onClick={() => setShowPassword(!showPassword)}
                  align="inline-end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </InputGroupAddon>
              </InputGroup>
            </FormControl>
            <FormMessage className="text-sm font-light ml-4" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem className="gap-1">
            <FormLabel className="ml-4 text-sm text-muted-foreground font-normal">hasło</FormLabel>
            <FormControl>
              <InputGroup className="rounded-full bg-white pl-2 pr-3 h-auto">
                <InputGroupInput
                  className="py-3 shrink-0 h-auto"
                  {...field}
                  type={showPassword ? "text" : "password"}
                  onBlur={() => form.trigger("confirmPassword")}
                />
                <InputGroupAddon>
                  <KeyRounded className="h-4 w-4 text-[#D85773]" />
                </InputGroupAddon>
                <InputGroupAddon
                  className="cursor-pointer select-none text-[#D85773] h-4 w-4"
                  onClick={() => setShowPassword(!showPassword)}
                  align="inline-end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </InputGroupAddon>
              </InputGroup>
            </FormControl>
            <FormMessage className="text-sm font-light ml-4" />
          </FormItem>
        )}
      />
      <div className="flex gap-4">
        <Button
          className="flex-1 py-3 h-auto mt-6 rounded-full bg-gradient-to-br from-[#D85773] to-[#B94357] shadow-xl text-xl font-semibold cursor-pointer"
          onClick={() => setTab("info")}
        >
          Wstecz
        </Button>
        <Button
          className="flex-2 py-3 h-auto mt-6 rounded-full bg-gradient-to-br from-[#D85773] to-[#B94357] shadow-xl text-xl font-semibold cursor-pointer"
          type="submit"
          disabled={!form.formState.isValid}
        >
          Zarejestruj się
        </Button>
      </div>
    </div>
  );
}

function PersonalTab({ form, setTab }: TabProps) {
  return (
    <div>
      password
      <div className="flex gap-4">
        <Button
          className="flex-1 py-3 h-auto mt-6 rounded-full bg-gradient-to-br from-[#D85773] to-[#B94357] shadow-xl text-xl font-semibold cursor-pointer"
          onClick={() => setTab("password")}
        >
          Wstecz
        </Button>
        <Button
          className="flex-2 py-3 h-auto mt-6 rounded-full bg-gradient-to-br from-[#D85773] to-[#B94357] shadow-xl text-xl font-semibold cursor-pointer"
          type="submit"
          disabled={!form.formState.isValid}
        >
          Zarejestruj się
        </Button>
      </div>
    </div>
  );
}

const tabs = ["info", "password", "personal"] as const;

export function Signup() {
  const [tab, setTab] = useState<(typeof tabs)[number]>(tabs[0]);
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "Dawid",
      surname: "Komęza",
      email: "dawid.komeza@gmail.com",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof registerSchema>) {
    console.log("chuj", data);
  }

  return (
    <>
      <div className="space-y-2">
        <h1 className="font-extrabold text-3xl">Cześć!</h1>
        <p className="text-base text-muted-foreground">
          Stwórz konto aby korzystać z całej aplikacji
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Tabs defaultValue="info" value={tab}>
            <TabsContent value="info">
              <InfoTab form={form} setTab={setTab} />
            </TabsContent>
            <TabsContent value="password">
              <PasswordTab form={form} setTab={setTab} />
            </TabsContent>
            <TabsContent value="personal">
              <PersonalTab form={form} setTab={setTab} />
            </TabsContent>
          </Tabs>
        </form>
      </Form>
      <div>
        <p className="text-sm text-center text-muted-foreground">
          Masz już konto?{" "}
          <a href="/login" className="font-semibold text-[#D85773] hover:underline">
            Zaloguj się
          </a>
        </p>
      </div>
    </>
  );
}
