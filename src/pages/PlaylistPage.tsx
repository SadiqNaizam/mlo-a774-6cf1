import React from 'react';

// Custom Layout Components
import AppHeader from '@/components/layout/AppHeader';
import LeftSidebar from '@/components/layout/LeftSidebar';
import AppFooter from '@/components/layout/AppFooter';
import SongListItem from '@/components/SongListItem';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

// Icons
import { Play, Shuffle, Pencil, Clock } from 'lucide-react';

// Placeholder data for the playlist
const playlistDetails = {
  name: "Doraemon's Gadget Mix",
  description: "A futuristic collection of tunes inspired by Doraemon's amazing gadgets.",
  owner: "Doraemon",
  imageUrl: "https://i.pinimg.com/originals/a8/38/a9/a838a9757504f76274438318739a89d4.jpg",
};

const tracks = [
  {
    trackNumber: 1,
    title: "Anywhere Door Drift",
    artist: "The Blue Racoon",
    artistSlug: "the-blue-racoon",
    duration: "3:45",
    imageUrl: "https://placehold.co/40x40/3b82f6/ffffff?text=AD",
  },
  {
    trackNumber: 2,
    title: "Time Machine Tempo",
    artist: "Nobita & The Nobis",
    artistSlug: "nobita-and-the-nobis",
    duration: "4:20",
    imageUrl: "https://placehold.co/40x40/f97316/ffffff?text=TM",
  },
  {
    trackNumber: 3,
    title: "Bamboo Copter Breeze",
    artist: "Shizuka's Serenade",
    artistSlug: "shizukas-serenade",
    duration: "2:55",
    imageUrl: "https://placehold.co/40x40/22c55e/ffffff?text=BC",
  },
  {
    trackNumber: 4,
    title: "Memory Bread Memory",
    artist: "Gian's Garage Band",
    artistSlug: "gians-garage-band",
    duration: "3:10",
    imageUrl: "https://placehold.co/40x40/ef4444/ffffff?text=MB",
  },
  {
    trackNumber: 5,
    title: "Small Light Anthem",
    artist: "Suneo's Synth",
    artistSlug: "suneos-synth",
    duration: "5:01",
    imageUrl: "https://placehold.co/40x40/eab308/ffffff?text=SL",
  },
];

const PlaylistPage = () => {
  console.log('PlaylistPage loaded');
  const { toast } = useToast();

  const handlePlaySong = (title: string) => {
    console.log(`Playing song: ${title}`);
    toast({
      title: "Now Playing",
      description: `"${title}" has started playing.`,
    });
  };

  const handleAddToPlaylist = (title: string) => {
    console.log(`Adding ${title} to a new playlist.`);
    toast({
      title: "Added to Playlist",
      description: `"${title}" has been added to a new playlist.`,
    });
  };

  return (
    <div className="grid md:grid-cols-[auto,1fr] h-screen font-sans bg-black">
      <LeftSidebar />
      <div className="flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-[#121212] text-white">
          <AppHeader />
          
          {/* Playlist Header */}
          <section className="flex flex-col md:flex-row items-center gap-6 p-6 bg-gradient-to-b from-blue-800 via-blue-900 to-[#121212]">
            <Avatar className="h-48 w-48 rounded-lg shadow-2xl">
              <AvatarImage src={playlistDetails.imageUrl} alt={playlistDetails.name} />
              <AvatarFallback>DG</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-3 text-center md:text-left">
              <span className="text-sm font-bold">Playlist</span>
              <h1 className="text-5xl lg:text-7xl font-black tracking-tighter">{playlistDetails.name}</h1>
              <p className="text-muted-foreground">{playlistDetails.description}</p>
              <p className="text-sm">
                Created by <span className="font-bold">{playlistDetails.owner}</span> • {tracks.length} songs
              </p>
            </div>
          </section>

          {/* Action Buttons */}
          <section className="p-6 bg-gradient-to-b from-black/20 to-[#121212]/0 sticky top-0 z-10 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <Button size="lg" className="rounded-full bg-green-500 hover:bg-green-600 text-black h-14 w-14 p-0">
                <Play className="h-7 w-7 fill-current" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
                <Shuffle className="h-6 w-6" />
              </Button>
               <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
                    <Pencil className="h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-gray-800 text-white border-gray-700">
                  <DialogHeader>
                    <DialogTitle>Edit Playlist</DialogTitle>
                    <DialogDescription>
                      Make changes to your playlist here. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input id="name" defaultValue={playlistDetails.name} className="col-span-3 bg-gray-700 border-gray-600" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Description
                      </Label>
                      <Input id="description" defaultValue={playlistDetails.description} className="col-span-3 bg-gray-700 border-gray-600" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </section>

          {/* Song List */}
          <section className="p-6">
            <div className="grid grid-cols-[auto,1fr,auto] md:grid-cols-[auto,1fr,auto,auto] gap-4 items-center text-muted-foreground border-b border-muted/20 pb-2 mb-4 text-sm">
              <div className="w-8 text-center">#</div>
              <div>Title</div>
              <div className="hidden md:block"><Clock className="w-4 h-4 inline-block mr-1" /></div>
              <div>{/* Spacer for options menu */}</div>
            </div>
            <div className="space-y-1">
              {tracks.map((track) => (
                <SongListItem
                  key={track.trackNumber}
                  {...track}
                  onPlay={() => handlePlaySong(track.title)}
                  onAddToPlaylist={() => handleAddToPlaylist(track.title)}
                />
              ))}
            </div>
          </section>
        </main>
        <AppFooter />
      </div>
    </div>
  );
};

export default PlaylistPage;