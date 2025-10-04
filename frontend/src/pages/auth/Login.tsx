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
import { useAuth } from "@/context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailRounded, KeyRounded, Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z.email({
    error: "Podaj poprawny adres email",
  }),
  password: z.string(),
});

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useAuth();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof loginSchema>) {
    signIn(data).catch((err) => {
      console.error("Login failed", err);
    });
  }

  return (
    <>
      <div className="space-y-2">
        <h1 className="font-extrabold text-3xl">Witaj ponownie!</h1>
        <p className="text-base text-muted-foreground">Zaloguj się aby korzystać z aplikacji</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="gap-1">
                <FormLabel className="ml-4 text-sm text-muted-foreground font-normal">
                  hasło
                </FormLabel>
                <FormControl>
                  <InputGroup className="rounded-full bg-white pl-2 pr-3 h-auto">
                    <InputGroupInput
                      className="py-3 shrink-0 h-auto"
                      {...field}
                      type={showPassword ? "text" : "password"}
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
          <Button
            className="py-3 h-auto mt-6 w-full rounded-full bg-gradient-to-br from-[#D85773] to-[#B94357] shadow-xl text-xl font-semibold cursor-pointer"
            type="submit"
            disabled={!form.formState.isValid}
          >
            Zaloguj się
          </Button>
        </form>
      </Form>
      <div>
        <p className="text-sm text-center text-muted-foreground">
          Nie masz konta?{" "}
          <a href="/signup" className="font-semibold text-[#D85773] hover:underline">
            Zarejestruj się
          </a>
        </p>
      </div>
    </>
  );
}
