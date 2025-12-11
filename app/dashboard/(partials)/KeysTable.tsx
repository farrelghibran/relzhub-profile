"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { dateFormat } from "@/src/lib/formatter";
import {
  createKey,
  deleteKey,
  getAllKeys,
  updateKey,
} from "@/src/services/key";
import { Key } from "@/src/types/key";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDownIcon,
  EllipsisIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import { generateRandomString } from "@/src/lib/generate";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { copyContent } from "@/src/lib/copy";
import { notify } from "@/src/lib/notify";
import { useSearchParams } from "next/navigation";
import SearchInput from "./SearchInput";

import PaginationKeys from "./KeysPagination";
import { RefactorDate } from "@/src/lib/refactor-date";

export default function KeysTable() {
  const [keys, setKeys] = useState<Key[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [value, setValue] = useState("");
  const [date, setDate] = useState<Date>();
  const [editValue, setEditValue] = useState("");
  const [editDate, setEditDate] = useState<Date>();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();

  const page = searchParams.get("page") || "1";
  const search = searchParams.get("search") || "";

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  async function getKeysData() {
    try {
      const res = await getAllKeys({ page, search });
      setKeys(res.data);
      setTotalPages(res.totalPages);
      setCurrentPage(res.page);
    } catch (e) {
      console.error("Error fetching keys", e);
    }
  }

  useEffect(() => {
    getKeysData();
  }, [refresh, page, search]);

  function isActiveKey(date: string) {
    const now = new Date();
    const expiredDate = new Date(date);

    return now < expiredDate;
  }

  async function handleCreateKey() {
    if (!value) return notify("Value is required!");
    if (!date) return notify("Date is required!");
    setLoading(true);
    try {
      const iso = RefactorDate(date!).toISOString();
      await createKey({
        value: value,
        expired_at: iso,
      });
      setValue("");
      notify("Key created successfully");
    } catch (error) {
      notify("Failed to create key");
      console.error("Error :", error);
    }
    setLoading(false);
    setRefresh((prev) => !prev);
  }
  async function handleUpdate(id: number, value: string, date: string) {
    setLoading(true);
    try {
      const dateToConvert = editDate || date;
      const iso = RefactorDate(new Date(dateToConvert!)).toISOString();
      await updateKey(id, {
        value: editValue || value,
        expired_at: iso,
      });
      setEditValue("");
      notify("Key updated successfully");
      setEditOpen(false);
      setRefresh((prev) => !prev);
    } catch (error) {
      notify("Failed to update key");
      console.error("Error :", error);
    }
    setLoading(false);
  }
  async function handleDeleteKey(id: number) {
    setLoading(true);
    try {
      await deleteKey(id);
      notify("Key deleted successfully");
    } catch (error) {
      notify("Failed to delete key");
      console.error("Error :", error);
    }
    setLoading(false);
    setRefresh((prev) => !prev);
  }
  return (
    <div className="w-full">
      <div className="w-full flex items-center gap-2">
        <SearchInput />
        <div className="ml-auto flex items-center gap-4">
          <Dialog>
            <form>
              <DialogTrigger asChild>
                <Button variant={"default"} size={"sm"}>
                  <PlusIcon></PlusIcon>
                  Create
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create</DialogTitle>
                  <DialogDescription className="text-muted-foreground">
                    Create new key
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label>Value</Label>
                    <div className="w-full flex items-center gap-2">
                      <Input
                        id="value"
                        name="value"
                        placeholder="Value"
                        onChange={(e) => setValue(e.target.value)}
                        value={value}
                      />
                      <Button
                        onClick={() => setValue(generateRandomString(70))}
                        variant={"default"}
                      >
                        Generate
                      </Button>
                    </div>
                  </div>
                  <div className="grid gap-3">
                    <Label>Expired Date</Label>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          id="date"
                          className="w-full justify-between font-normal"
                        >
                          {date ? date.toLocaleDateString() : "Select date"}
                          <ChevronDownIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-full overflow-hidden p-0"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={date}
                          captionLayout="dropdown"
                          onSelect={(date) => {
                            setDate(date);
                            setOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button
                    disabled={loading}
                    onClick={() => handleCreateKey()}
                    type="submit"
                  >
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
        </div>
      </div>
      <Table className="rounded-xl overflow-hidden my-4">
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Value</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Expired</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {keys.map((value, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">{++i}</TableCell>
              <TableCell>
                <button
                  className="hover:underline hover:cursor-pointer"
                  onClick={() => copyContent(value.value)}
                >
                  {value.value.substring(0, 30)}
                </button>
              </TableCell>
              <TableCell
                className={`${
                  isActiveKey(value.expired_at || "")
                    ? "text-green-400"
                    : "text-red-400"
                } text-center`}
              >
                {isActiveKey(value.expired_at || "") ? "Active" : "Expired"}
              </TableCell>
              <TableCell>{dateFormat(value.created_at || "")}</TableCell>
              <TableCell>{dateFormat(value.expired_at || "")}</TableCell>
              <TableCell className="text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <EllipsisIcon
                      size={40}
                      className="p-3 rounded-xl bg-muted hover:cursor-pointer"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <Dialog open={editOpen} onOpenChange={setEditOpen}>
                      <form>
                        <DialogTrigger asChild>
                          <Button
                            className="w-full hover:cursor-pointer"
                            variant={"ghost"}
                            size={"sm"}
                            onClick={() => setEditOpen(true)}
                          >
                            <PencilIcon />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Update</DialogTitle>
                            <DialogDescription className="text-muted-foreground">
                              Update key
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4">
                            <div className="grid gap-3">
                              <Label>Value</Label>
                              <div className="w-full flex items-center gap-2">
                                <Input
                                  id="value"
                                  name="value"
                                  placeholder={value.value}
                                  onChange={(e) => setEditValue(e.target.value)}
                                  value={editValue || value.value}
                                />
                                <Button
                                  onClick={() =>
                                    setEditValue(generateRandomString(70))
                                  }
                                  variant={"default"}
                                >
                                  Generate
                                </Button>
                              </div>
                            </div>
                            <div className="grid gap-3">
                              <Label>Expired Date</Label>
                              <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    id="date"
                                    className="w-full justify-between font-normal"
                                  >
                                    {editDate
                                      ? editDate.toLocaleDateString()
                                      : new Date(
                                          value.expired_at || ""
                                        ).toLocaleDateString()}
                                    <ChevronDownIcon />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-full overflow-hidden p-0"
                                  align="start"
                                >
                                  <Calendar
                                    mode="single"
                                    selected={
                                      value.expired_at
                                        ? new Date(value.expired_at)
                                        : undefined
                                    }
                                    captionLayout="dropdown"
                                    onSelect={(date) => {
                                      setEditDate(date);
                                      setOpen(false);
                                    }}
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button
                                variant="outline"
                                onClick={() => setEditOpen(true)}
                              >
                                Cancel
                              </Button>
                            </DialogClose>
                            <Button
                              disabled={loading}
                              onClick={() =>
                                handleUpdate(
                                  value.id,
                                  value.value,
                                  value.expired_at || ""
                                )
                              }
                              type="submit"
                            >
                              Save changes
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </form>
                    </Dialog>
                    <Button
                      className="w-full text-red-400 hover:text-red-400 hover:cursor-pointer"
                      variant={"ghost"}
                      size={"sm"}
                      onClick={() => handleDeleteKey(value.id)}
                    >
                      <TrashIcon />
                    </Button>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationKeys totalPages={totalPages} currentPage={currentPage} />
    </div>
  );
}
