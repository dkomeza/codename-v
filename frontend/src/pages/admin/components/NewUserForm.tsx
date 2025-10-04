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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function NewUserForm() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log("Dodano użytkownika (nieprawdziwe)");
      }}
    >
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
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" defaultValue="Email" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="name">Imię</Label>
            <Input id="name" name="name" defaultValue="Imię" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="surname">Nazwisko</Label>
            <Input id="surname" name="surname" defaultValue="Nazwisko" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="type">Typ</Label>
            <Select>
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
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="cursor-pointer">
              Anuluj
            </Button>
          </DialogClose>
          <Button type="submit" className="cursor-pointer">
            Zapisz
          </Button>
        </DialogFooter>
      </DialogContent>
    </form>
  );
}

export default NewUserForm;
