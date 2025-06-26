import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Layout Components
import AppHeader from '@/components/layout/AppHeader';
import LeftSidebar from '@/components/layout/LeftSidebar';
import AppFooter from '@/components/layout/AppFooter';

// Custom Components
import SongListItem from '@/components/SongListItem';
import ContentGrid from '@/components/ContentGrid';

// Shadcn/UI Components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

// Icons
import { Check, Play } from 'lucide-react';

// --- MOCK DATA ---
const artist = {
  name: 'Future Gadget Band',
  followers: '1,998,090 followers',
  imageUrl: 'https://i.pravatar.cc/150?u=future-gadget-band',
  artistSlug: 'future-gadget-band',
};

const popularSongs = [
  { trackNumber: 1, title: 'Echoes of Tomorrow', duration: '3:45', imageUrl: 'https://picsum.photos/seed/echoes/200' },
  { trackNumber: 2, title: 'Pocketful of Dreams', duration: '4:20', imageUrl: 'https://picsum.photos/seed/dreams/200' },
  { trackNumber: 3, title: 'Anywhere Door to Your Heart', duration: '3:15', imageUrl: 'https://picsum.photos/seed/heart/200' },
  { trackNumber: 4, title: 'Time-Lapse City', duration: '5:01', imageUrl: 'https://picsum.photos/seed/city/200' },
  { trackNumber: 5, title: 'Bamboo Copter Boogie', duration: '2:58', imageUrl: 'https://picsum.photos/seed/boogie/200' },
];

const albums = [
  { title: 'Chronoscape', year: '2023', imageUrl: 'https://picsum.photos/seed/chronoscape/300' },
  { title: '22nd Century Beats', year: '2021', imageUrl: 'https://picsum.photos/seed/22ndcentury/300' },
  { title: 'Neon Pocket', year: '2019', imageUrl: 'https://picsum.photos/seed/neonpocket/300' },
  { title: 'Robotic Heart', year: '2017', imageUrl: 'https://picsum.photos/seed/roboticheart/300' },
];
// --- END MOCK DATA ---

const ArtistPage = () => {
  console.log('ArtistPage loaded');
  const [isFollowing, setIsFollowing] = useState(false);

  const handlePlay = (songTitle: string) => {
    console.log(`Playing song: ${songTitle}`);
    // In a real app, this would trigger the music player context
  };

  const handleAddToPlaylist = (songTitle: string) => {
    console.log(`Adding ${songTitle} to a playlist...`);
    // This would open a dialog to select a playlist
  };

  return (
    <div className="relative flex h-screen overflow-hidden bg-background text-foreground">
      <LeftSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader />
        <ScrollArea className="flex-1">
          <div className="pb-24"> {/* Padding for the fixed AppFooter */}
            {/* Artist Header */}
            <section 
              className="relative flex flex-col md:flex-row items-center gap-8 p-8 h-80 bg-gradient-to-b from-blue-800 to-blue-900 text-white"
            >
              <Avatar className="h-48 w-48 shadow-lg border-4 border-background">
                <AvatarImage src={artist.imageUrl} alt={artist.name} />
                <AvatarFallback>{artist.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-4 items-center md:items-start text-center md:text-left">
                <span className="text-sm font-bold">Artist</span>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter">{artist.name}</h1>
                <p className="text-muted-foreground text-white/80">{artist.followers}</p>
              </div>
            </section>

            {/* Action Bar */}
            <div className="p-8 flex items-center gap-4">
              <Button size="icon" className="h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg">
                <Play className="h-6 w-6 fill-black text-black" />
              </Button>
              <Button 
                variant={isFollowing ? 'secondary' : 'outline'} 
                className="w-28" 
                onClick={() => setIsFollowing(!isFollowing)}
              >
                {isFollowing ? <Check className="mr-2 h-4 w-4" /> : null}
                {isFollowing ? 'Following' : 'Follow'}
              </Button>
            </div>

            {/* Popular Songs */}
            <section className="px-8">
              <h2 className="text-2xl font-bold mb-4">Popular</h2>
              <div className="flex flex-col">
                {popularSongs.map((song, index) => (
                  <SongListItem
                    key={index}
                    trackNumber={index + 1}
                    title={song.title}
                    artist={artist.name}
                    artistSlug={artist.artistSlug}
                    duration={song.duration}
                    imageUrl={song.imageUrl}
                    onPlay={() => handlePlay(song.title)}
                    onAddToPlaylist={() => handleAddToPlaylist(song.title)}
                  />
                ))}
              </div>
            </section>

            {/* Albums */}
            <div className="p-8">
              <ContentGrid title="Albums">
                {albums.map((album) => (
                  <Link to="/playlist" key={album.title}>
                    <Card className="overflow-hidden hover:bg-muted/50 transition-colors">
                      <CardHeader className="p-0">
                        <img src={album.imageUrl} alt={album.title} className="aspect-square object-cover" />
                      </CardHeader>
                      <CardContent className="p-4">
                        <CardTitle className="text-base font-bold truncate">{album.title}</CardTitle>
                        <CardDescription>{album.year}</CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </ContentGrid>
            </div>
          </div>
        </ScrollArea>
      </div>
      <AppFooter />
    </div>
  );
};

export default ArtistPage;