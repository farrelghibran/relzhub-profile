"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisIcon, PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
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
import {
  createStatus,
  deleteStatus,
  getAllStatus,
  updateStatus,
} from "@/src/services/status";
import { notify } from "@/src/lib/notify";
import { Status } from "@/src/types/status";

export default function StatusTable() {
  const [status, setStatus] = useState<Status[]>([]);
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editColor, setEditColor] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  async function getStatusData() {
    try {
      const res = await getAllStatus();
      setStatus(res.data);
    } catch (e) {
      console.error("Error fetching keys", e);
    }
  }

  useEffect(() => {
    getStatusData();
  }, [refresh]);

  async function handleCreateStatus() {
    if (!title) return notify("Title is required!");
    if (!color) return notify("Color is required!");
    setLoading(true);
    try {
      await createStatus({
        title: title,
        color: color,
      });
      setTitle("");
      setColor("");
      notify("Status created successfully!");
    } catch (error) {
      notify("Failed to create status!");
      console.error("Error :", error);
    }
    setLoading(false);
    setRefresh(!refresh);
  }
  async function handleUpdate(id: number, title: string, color: string) {
    setLoading(true);
    try {
      await updateStatus(id, {
        title: editTitle || title,
        color: editColor || color,
      });
      setEditTitle("");
      setEditColor("");
      notify("Status updated successfully!");
    } catch (error) {
      notify("Failed to update status!");
      console.error("Error :", error);
    }
    setLoading(false);
    setEditOpen(false);
    setRefresh((prev) => !prev);
  }
  async function handleDeleteStatus(id: number) {
    setLoading(true);
    try {
      await deleteStatus(id);
      notify("Status deleted successfully!");
    } catch (error) {
      notify("Failed to delete status!");
      console.error("Error :", error);
    }
    setLoading(false);
    setRefresh(!refresh);
  }
  return (
    <div className="w-full">
      <div className="w-full flex items-center gap-2">
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
                    Create new status
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label>Title</Label>
                    <div className="w-full flex items-center gap-2">
                      <Input
                        id="title"
                        name="title"
                        placeholder="Title"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                      />
                    </div>
                  </div>
                  <div className="grid gap-3">
                    <Label>Color</Label>
                    <div className="w-full flex items-center gap-2">
                      <Input
                        id="color"
                        name="color"
                        placeholder="Color"
                        onChange={(e) => setColor(e.target.value)}
                        value={color}
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button
                    disabled={loading}
                    onClick={() => handleCreateStatus()}
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
      <Table className="rounded-xl overflow-hidden mt-4">
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-start">Color</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {status.map((value, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">{++i}</TableCell>
              <TableCell>
                <p>{value.title}</p>
              </TableCell>
              <TableCell>{value.color}</TableCell>
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
                              Update status
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4">
                            <div className="grid gap-3">
                              <Label>Title</Label>
                              <div className="w-full flex items-center gap-2">
                                <Input
                                  id="title"
                                  name="title"
                                  placeholder={value.title}
                                  onChange={(e) => setEditTitle(e.target.value)}
                                  value={editTitle || value.title}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="grid gap-4">
                            <div className="grid gap-3">
                              <Label>Color</Label>
                              <div className="w-full flex items-center gap-2">
                                <Input
                                  id="color"
                                  name="color"
                                  placeholder={value.color}
                                  onChange={(e) => setEditColor(e.target.value)}
                                  value={editColor || value.color}
                                />
                              </div>
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
                                  value.title,
                                  value.color || ""
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
                      onClick={() => handleDeleteStatus(value.id)}
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
    </div>
  );
}
