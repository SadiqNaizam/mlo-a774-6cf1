import React, { useState } from 'react';

// Custom Layout Components
import AppHeader from '@/components/layout/AppHeader';
import LeftSidebar from '@/components/layout/LeftSidebar';
import AppFooter from '@/components/layout/AppFooter';
import ContentGrid from '@/components/ContentGrid';
import SongListItem from '@/components/SongListItem';

// shadcn/ui Components
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Icons
import { Search as SearchIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Mock Data for Search Results
const mockSongs = [
  {
    trackNumber: 1,
    title: "Doraemon no Uta",
    artist: "Kumiko Osugi",
    artistSlug: "kumiko-osugi",
    duration: "2:55",
    imageUrl: "https://i.scdn.co/image/ab67616d0000b2738f6e3c3f4e3c3f4e3c3f4e3c", // Placeholder image
  },
  {
    trackNumber: 2,
    title: "Yume wo Kanaete Doraemon",
    artist: "Mao",
    artistSlug: "mao",
    duration: "4:06",
    imageUrl: "https://i.scdn.co/image/ab67616d0000b2739f6e3c3f4e3c3f4e3c3f4e3d", // Placeholder image
  },
];

const mockArtists = [
    { name: "Doraemon Band", imageUrl: "https://i.pravatar.cc/150?u=doraemon-band" },
    { name: "Nobita & The Sleepers", imageUrl: "https://i.pravatar.cc/150?u=nobita" }
];

const mockAlbums = [
    { name: "Gadget Grooves", artist: "Doraemon Band", imageUrl: "https://i.pravatar.cc/150?u=gadget-grooves" },
    { name: "Acoustic Afternoon", artist: "Shizuka", imageUrl: "https://i.pravatar.cc/150?u=shizuka-acoustic" }
];

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  console.log('SearchPage loaded');

  const handlePlay = (title: string) => {
    console.log(`Playing song: ${title}`);
    toast({
      title: "Playback Started",
      description: `Now playing "${title}".`,
    });
  };

  const handleAddToPlaylist = (title: string) => {
    console.log(`Adding ${title} to a playlist.`);
    // Here you would typically open a dialog to select a playlist
    toast({
      title: "Added to Playlist",
      description: `"${title}" has been added successfully.`,
    });
  };

  return (
    <div className="flex h-screen bg-black text-white">
      <LeftSidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <AppHeader />
        <ScrollArea className="flex-1">
          <div className="p-6 space-y-8">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="What do you want to listen to?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg bg-muted border-transparent focus:bg-muted/80 focus:ring-2 focus:ring-primary"
              />
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="songs">Songs</TabsTrigger>
                <TabsTrigger value="artists">Artists</TabsTrigger>
                <TabsTrigger value="albums">Albums</TabsTrigger>
              </TabsList>
              
              {/* All Tab */}
              <TabsContent value="all" className="mt-6">
                <div className="space-y-8">
                    <section>
                        <h3 className="text-xl font-bold mb-4">Top Result</h3>
                        {mockSongs.length > 0 && (
                            <SongListItem
                                {...mockSongs[0]}
                                onPlay={() => handlePlay(mockSongs[0].title)}
                                onAddToPlaylist={() => handleAddToPlaylist(mockSongs[0].title)}
                            />
                        )}
                    </section>
                    <section>
                        <h3 className="text-xl font-bold mb-4">Songs</h3>
                        {mockSongs.map((song) => (
                            <SongListItem
                                key={song.title}
                                {...song}
                                onPlay={() => handlePlay(song.title)}
                                onAddToPlaylist={() => handleAddToPlaylist(song.title)}
                            />
                        ))}
                    </section>
                </div>
              </TabsContent>

              {/* Songs Tab */}
              <TabsContent value="songs" className="mt-6">
                 {mockSongs.map((song) => (
                    <SongListItem
                        key={song.title}
                        {...song}
                        onPlay={() => handlePlay(song.title)}
                        onAddToPlaylist={() => handleAddToPlaylist(song.title)}
                    />
                ))}
              </TabsContent>
              
              {/* Artists Tab */}
              <TabsContent value="artists" className="mt-6">
                <ContentGrid title="Artists">
                   {mockArtists.map(artist => (
                     <Card key={artist.name} className="bg-muted/50 border-0 p-4 flex flex-col items-center text-center gap-2 hover:bg-muted/80 cursor-pointer">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={artist.imageUrl} alt={artist.name}/>
                            <AvatarFallback>{artist.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <p className="font-bold mt-2">{artist.name}</p>
                        <p className="text-sm text-muted-foreground">Artist</p>
                     </Card>
                   ))}
                </ContentGrid>
              </TabsContent>
              
              {/* Albums Tab */}
              <TabsContent value="albums" className="mt-6">
                 <ContentGrid title="Albums">
                   {mockAlbums.map(album => (
                     <Card key={album.name} className="bg-muted/50 border-0 p-4 hover:bg-muted/80 cursor-pointer">
                        <CardContent className="p-0 flex flex-col gap-2">
                           <Avatar className="h-full w-full aspect-square rounded-md">
                                <AvatarImage src={album.imageUrl} alt={album.name}/>
                                <AvatarFallback>{album.name.charAt(0)}</AvatarFallback>
                           </Avatar>
                           <p className="font-bold mt-2 truncate">{album.name}</p>
                           <p className="text-sm text-muted-foreground truncate">{album.artist}</p>
                        </CardContent>
                     </Card>
                   ))}
                 </ContentGrid>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </main>
      <AppFooter />
    </div>
  );
};

export default SearchPage;