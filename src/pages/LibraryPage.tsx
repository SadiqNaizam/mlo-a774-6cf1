import React from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import AppHeader from '@/components/layout/AppHeader';
import LeftSidebar from '@/components/layout/LeftSidebar';
import ContentGrid from '@/components/ContentGrid';
import SongListItem from '@/components/SongListItem';

// shadcn/ui Components
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from "@/components/ui/use-toast";

// Mock Data
const playlists = [
  { id: '1', name: "Doraemon's Gadget Mix", imageUrl: 'https://i.scdn.co/image/ab67706c0000da8413552b9acbe9348e35a16174' },
  { id: '2', name: 'Future Funk Favorites', imageUrl: 'https://i.scdn.co/image/ab67706c0000da847743b19b7204f26a110041f0' },
  { id: '3', name: 'Nobita\'s Chill Lo-fi', imageUrl: 'https://i.scdn.co/image/ab67706f00000002847a935515711e51f50f22fc' },
  { id: '4', name: 'J-Pop Hits', imageUrl: 'https://i.scdn.co/image/ab67706f0000000270a724733e85e2363a8637c3' },
];

const artists = [
  { id: '1', name: 'Fujiko F. Fujio', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Fujiko_F_Fujio_Kawasaki_Museum_Statue.jpg/800px-Fujiko_F_Fujio_Kawasaki_Museum_Statue.jpg', slug: 'fujiko-f-fujio' },
  { id: '2', name: 'Yonezu Kenshi', imageUrl: 'https://i.scdn.co/image/ab6761610000e5ebc34f8bb34151a69a3182b8b9', slug: 'yonezu-kenshi' },
  { id: '3', name: 'YOASOBI', imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb21d604923ee57a6275460c4d', slug: 'yoasobi' },
  { id: '4', name: 'Eve', imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb645479831c16f274a2794719', slug: 'eve' },
];

const likedSongs = [
  { trackNumber: 1, title: 'Doraemon no Uta', artist: 'Kumiko Osugi', artistSlug: 'kumiko-osugi', duration: '2:45', imageUrl: 'https://i.scdn.co/image/ab67616d0000b2738b3b5b3b5b3b5b3b5b3b5b3b' },
  { trackNumber: 2, title: 'Yume wo Kanaete Doraemon', artist: 'mao', artistSlug: 'mao', duration: '4:06', imageUrl: 'https://i.scdn.co/image/ab67616d0000b273d6b0b6b0b6b0b6b0b6b0b6b0' },
  { trackNumber: 3, title: 'Racing into the Night', artist: 'YOASOBI', artistSlug: 'yoasobi', duration: '4:18', imageUrl: 'https://i.scdn.co/image/ab67616d0000b2738a7c5c2c5c1c5c1c5c1c5c1c' },
  { trackNumber: 4, title: 'KICK BACK', artist: 'Yonezu Kenshi', artistSlug: 'yonezu-kenshi', duration: '3:13', imageUrl: 'https://i.scdn.co/image/ab67616d0000b273e3e3e3e3e3e3e3e3e3e3e3e3' },
];


const LibraryPage = () => {
  console.log('LibraryPage loaded');
  const { toast } = useToast();

  const handlePlaySong = (title: string) => {
    console.log(`Playing song: ${title}`);
    toast({
      title: "Playback Started",
      description: `Now playing "${title}".`,
    });
  };

  const handleAddToPlaylist = (title: string) => {
    console.log(`Adding ${title} to a playlist.`);
    toast({
      title: "Added to Playlist",
      description: `"${title}" has been added to your selected playlist.`,
    });
  };

  return (
    <div className="flex bg-background text-foreground h-screen overflow-hidden">
      <LeftSidebar />
      <div className="flex-1 flex flex-col">
        <AppHeader />
        <ScrollArea className="flex-1">
          <main className="p-8 pb-24">
            <h1 className="text-3xl font-bold tracking-tight mb-6">Your Library</h1>
            <Tabs defaultValue="playlists" className="w-full">
              <TabsList>
                <TabsTrigger value="playlists">Playlists</TabsTrigger>
                <TabsTrigger value="artists">Artists</TabsTrigger>
                <TabsTrigger value="songs">Liked Songs</TabsTrigger>
              </TabsList>
              
              <TabsContent value="playlists" className="mt-6">
                <ContentGrid title="">
                  {playlists.map((playlist) => (
                    <Link to="/playlist" key={playlist.id}>
                      <Card className="overflow-hidden hover:bg-muted/50 transition-colors group">
                        <img src={playlist.imageUrl} alt={playlist.name} className="w-full h-auto aspect-square object-cover" />
                        <CardContent className="p-3">
                          <p className="font-semibold truncate">{playlist.name}</p>
                          <p className="text-sm text-muted-foreground">Playlist</p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </ContentGrid>
              </TabsContent>
              
              <TabsContent value="artists" className="mt-6">
                 <ContentGrid title="">
                  {artists.map((artist) => (
                    <Link to={`/artist`} key={artist.id}>
                      <Card className="overflow-hidden hover:bg-muted/50 transition-colors group p-4 text-center">
                        <Avatar className="w-full h-auto aspect-square rounded-full mx-auto">
                           <AvatarImage src={artist.imageUrl} alt={artist.name} className="object-cover"/>
                           <AvatarFallback>{artist.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <CardContent className="p-3 pb-0">
                          <p className="font-semibold truncate mt-2">{artist.name}</p>
                          <p className="text-sm text-muted-foreground">Artist</p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </ContentGrid>
              </TabsContent>

              <TabsContent value="songs" className="mt-4">
                <div className="flex flex-col gap-1">
                   {likedSongs.map((song, index) => (
                    <SongListItem
                      key={index}
                      trackNumber={song.trackNumber}
                      title={song.title}
                      artist={song.artist}
                      artistSlug={song.artistSlug}
                      duration={song.duration}
                      imageUrl={song.imageUrl}
                      onPlay={() => handlePlaySong(song.title)}
                      onAddToPlaylist={() => handleAddToPlaylist(song.title)}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </ScrollArea>
      </div>
    </div>
  );
};

export default LibraryPage;