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
import {
  Check,
  ChevronsUpDown,
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
import {
  createGame,
  deleteGame,
  getAllGames,
  updateGame,
} from "@/src/services/game";
import { Game } from "@/src/types/game";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { getAllStatus } from "@/src/services/status";
import { Status } from "@prisma/client";
import { notify } from "@/src/lib/notify";

export default function GamesTable() {
  const [games, setGames] = useState<Game[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState(0);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editStatus, setEditStatus] = useState(0);
  const [statusList, setStatusList] = useState<Status[]>([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [openEditStatus, setOpenEditStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  async function getGamesData() {
    try {
      const res = await getAllGames();
      setGames(res.data);
    } catch (e) {
      console.error("Error fetching keys", e);
    }
  }
  async function getStatusData() {
    try {
      const res = await getAllStatus();
      setStatusList(res.data);
    } catch (e) {
      console.error("Error fetching keys", e);
    }
  }

  useEffect(() => {
    getGamesData();
    getStatusData();
  }, [refresh]);

  async function handleCreateGame() {
    if (!title) return notify("Title is required!");
    if (!content) return notify("Content is required!");
    if (!image) return notify("Image is required!");
    if (!status) return notify("Status is required!");
    setLoading(true);
    try {
      await createGame({
        title: title,
        content: content,
        image: image,
        statusId: status,
      });
      setTitle("");
      setContent("");
      setImage("");
      notify("Game created successfully!");
    } catch (error) {
      notify("Failed to create game!");
      console.error("Error :", error);
    }
    setLoading(false);
    setOpen(false);
  }
  async function handleUpdate(
    id: number,
    title: string,
    content: string,
    image: string,
    statusId: number
  ) {
    setLoading(true);
    try {
      await updateGame(id, {
        title: editTitle || title,
        content: editContent || content,
        image: editImage || image,
        statusId: editStatus || statusId,
      });
      setEditTitle("");
      setEditContent("");
      setEditImage("");
      notify("Game updated successfully!");
    } catch (error) {
      notify("Failed to update game!");
      console.error("Error :", error);
    }
    setLoading(false);
    setEditOpen(false);
    setRefresh(!refresh);
  }
  async function handleDeleteGame(id: number) {
    setLoading(true);
    try {
      await deleteGame(id);
      notify("Game deleted successfully!");
    } catch (error) {
      notify("Failed to delete game!");
      console.error("Error :", error);
    }
    setStatus(0);
    setLoading(false);
  }
  return (
    <div className="w-full">
      <div className="w-full flex items-center gap-2">
        <div className="ml-auto flex items-center gap-4">
          <Dialog open={open} onOpenChange={setOpen}>
            <form>
              <DialogTrigger asChild>
                <Button
                  variant={"default"}
                  size={"sm"}
                  onClick={() => setOpen(true)}
                >
                  <PlusIcon></PlusIcon>
                  Create
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create</DialogTitle>
                  <DialogDescription className="text-muted-foreground">
                    Create new games
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
                    <Label>Content</Label>
                    <div className="w-full flex items-center gap-2">
                      <Input
                        id="content"
                        name="content"
                        placeholder="Content"
                        onChange={(e) => setContent(e.target.value)}
                        value={content}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label>Image</Label>
                      <div className="w-full flex items-center gap-2">
                        <Input
                          id="image"
                          name="image"
                          placeholder="Image"
                          onChange={(e) => setImage(e.target.value)}
                          value={image}
                        />
                      </div>
                    </div>
                    <div className="grid gap-3">
                      <Label>Status</Label>
                      <div className="w-full flex items-center gap-2">
                        <Popover open={openStatus} onOpenChange={setOpenStatus}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={openStatus}
                              className="w-[200px] justify-between"
                            >
                              {statusList?.find((val) => val.id === status)
                                ?.title ?? "Select status..."}
                              <ChevronsUpDown className="opacity-50" />
                            </Button>
                          </PopoverTrigger>

                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput
                                placeholder="Search status..."
                                className="h-9"
                              />
                              <CommandList>
                                <CommandEmpty>No Status found.</CommandEmpty>
                                <CommandGroup>
                                  {statusList?.map((val) => (
                                    <CommandItem
                                      key={val.id}
                                      value={String(val.id)}
                                      onSelect={(value) => {
                                        setStatus(Number(value));
                                        setOpenStatus(false);
                                      }}
                                    >
                                      {val.title}
                                      <Check
                                        className={cn(
                                          "ml-auto",
                                          status === val.id
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline" onClick={() => setOpen(false)}>
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    disabled={loading}
                    onClick={() => handleCreateGame()}
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
            <TableHead className="text-start">Content</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {games.map((value, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">{++i}</TableCell>
              <TableCell>
                <p>{value.title}</p>
              </TableCell>
              <TableCell>{value.content}</TableCell>
              <TableCell>{value.Status.title}</TableCell>
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
                            <DialogTitle>Edit</DialogTitle>
                            <DialogDescription className="text-muted-foreground">
                              Edit games
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
                                  onChange={(e) => setEditTitle(e.target.value)}
                                  value={editTitle || value.title}
                                />
                              </div>
                            </div>
                            <div className="grid gap-3">
                              <Label>Content</Label>
                              <div className="w-full flex items-center gap-2">
                                <Input
                                  id="content"
                                  name="content"
                                  placeholder="Content"
                                  onChange={(e) =>
                                    setEditContent(e.target.value)
                                  }
                                  value={editContent || value.content}
                                />
                              </div>
                              <div className="grid gap-3">
                                <Label>Image</Label>
                                <div className="w-full flex items-center gap-2">
                                  <Input
                                    id="image"
                                    name="image"
                                    placeholder="Image"
                                    onChange={(e) =>
                                      setEditImage(e.target.value)
                                    }
                                    value={editImage || value.image}
                                  />
                                </div>
                              </div>
                              <div className="grid gap-3">
                                <Label>Status</Label>
                                <div className="w-full flex items-center gap-2">
                                  <Popover
                                    open={openEditStatus}
                                    onOpenChange={setOpenEditStatus}
                                  >
                                    <PopoverTrigger asChild>
                                      <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={openEditStatus}
                                        className="w-[200px] justify-between"
                                      >
                                        {statusList?.find(
                                          (val) => val.id === editStatus
                                        )?.title ??
                                          statusList?.find(
                                            (val) => val.id === value.Status.id
                                          )?.title}
                                        <ChevronsUpDown className="opacity-50" />
                                      </Button>
                                    </PopoverTrigger>

                                    <PopoverContent className="w-[200px] p-0">
                                      <Command>
                                        <CommandInput
                                          placeholder="Search status..."
                                          className="h-9"
                                        />
                                        <CommandList>
                                          <CommandEmpty>
                                            No Status found.
                                          </CommandEmpty>
                                          <CommandGroup>
                                            {statusList?.map((val) => (
                                              <CommandItem
                                                key={val.id}
                                                value={String(val.id)}
                                                onSelect={(target) => {
                                                  setEditStatus(Number(target));
                                                  setOpenEditStatus(false);
                                                }}
                                              >
                                                {val.title}
                                                <Check
                                                  className={cn(
                                                    "ml-auto",
                                                    editStatus === val.id
                                                      ? "opacity-100"
                                                      : "opacity-0"
                                                  )}
                                                />
                                              </CommandItem>
                                            ))}
                                          </CommandGroup>
                                        </CommandList>
                                      </Command>
                                    </PopoverContent>
                                  </Popover>
                                </div>
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button
                                variant="outline"
                                onClick={() => setOpen(false)}
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
                                  value.content,
                                  value.image,
                                  value.Status.id
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
                      onClick={() => handleDeleteGame(value.id)}
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
