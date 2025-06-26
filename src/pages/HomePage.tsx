import React from 'react';
import { Link } from 'react-router-dom';

// Custom Layout Components
import AppHeader from '@/components/layout/AppHeader';
import LeftSidebar from '@/components/layout/LeftSidebar';
import AppFooter from '@/components/layout/AppFooter';
import ContentGrid from '@/components/ContentGrid';

// shadcn/ui Components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

// Placeholder data for featured content
const featuredPlaylists = [
  {
    id: 'pl1',
    title: "Doraemon's Gadget Mix",
    description: "Upbeat tracks for your next big invention.",
    imageUrl: 'https://placehold.co/300x300/3B82F6/FFFFFF?text=D',
  },
  {
    id: 'pl2',
    title: "Nobita's Chill Lo-fi",
    description: 'Relaxing beats for afternoon naps.',
    imageUrl: 'https://placehold.co/300x300/FBBF24/FFFFFF?text=N',
  },
  {
    id: 'pl3',
    title: "Shizuka's Study Beats",
    description: 'Focus-enhancing music for violin practice.',
    imageUrl: 'https://placehold.co/300x300/EC4899/FFFFFF?text=S',
  },
  {
    id: 'pl4',
    title: "Gian's Power Anthems",
    description: 'Loud, proud, and perfect for karaoke.',
    imageUrl: 'https://placehold.co/300x300/F97316/FFFFFF?text=G',
  },
  {
    id: 'pl5',
    title: "Suneo's Rich Vibes",
    description: 'Luxurious tracks for showing off.',
    imageUrl: 'https://placehold.co/300x300/8B5CF6/FFFFFF?text=S',
  },
];

const newReleases = [
  {
    id: 'nr1',
    title: 'Future Funk Favorites',
    description: 'Artist: Various Artists',
    imageUrl: 'https://placehold.co/300x300/10B981/FFFFFF?text=FF',
  },
  {
    id: 'nr2',
    title: 'Anime Openings Vol. 3',
    description: 'Artist: J-Pop Stars',
    imageUrl: 'https://placehold.co/300x300/EF4444/FFFFFF?text=A',
  },
  {
    id: 'nr3',
    title: 'City Pop Classics',
    description: 'Artist: Mariya Takeuchi',
    imageUrl: 'https://placehold.co/300x300/6366F1/FFFFFF?text=CP',
  },
  {
    id: 'nr4',
    title: 'Memory Bread EP',
    description: 'Artist: The Dorayakis',
    imageUrl: 'https://placehold.co/300x300/F59E0B/FFFFFF?text=MB',
  },
  {
    id: 'nr5',
    title: 'Anywhere Door Journeys',
    description: 'Artist: Lo-fi Cat',
    imageUrl: 'https://placehold.co/300x300/0EA5E9/FFFFFF?text=AD',
  },
  {
    id: 'nr6',
    title: 'Time Machine Travels',
    description: 'Artist: Chrono Beats',
    imageUrl: 'https://placehold.co/300x300/D946EF/FFFFFF?text=TM',
  },
];

const HomePage: React.FC = () => {
  console.log('HomePage loaded');

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      <LeftSidebar />

      <div className="flex-1 flex flex-col relative">
        {/* The main content area with its own header and scroll view */}
        <div 
          className="flex-1 flex flex-col bg-gradient-to-b from-blue-900/60 via-black/80 to-black overflow-hidden"
          style={{ backgroundImage: 'linear-gradient(to bottom, var(--tw-gradient-stops))' }}
        >
          <AppHeader />

          {/* Using ScrollArea for the main content to ensure it scrolls independently */}
          <ScrollArea className="flex-1">
            <main className="p-6 md:p-8 space-y-8 pb-24">
              <ContentGrid title="Doraemon's Featured Playlists">
                {featuredPlaylists.map((playlist) => (
                  <Link to="/playlist" key={playlist.id}>
                    <Card className="bg-muted/20 border-none hover:bg-muted/40 transition-colors duration-300 group">
                      <CardHeader className="p-4">
                        <div className="aspect-square rounded-md overflow-hidden mb-4">
                          <img
                            src={playlist.imageUrl}
                            alt={playlist.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <CardTitle className="text-base font-bold truncate group-hover:underline">
                          {playlist.title}
                        </CardTitle>
                        <CardDescription className="text-sm text-muted-foreground truncate">
                          {playlist.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </ContentGrid>

              <ContentGrid title="Fresh New Music">
                {newReleases.map((release) => (
                  <Link to="/playlist" key={release.id}>
                    <Card className="bg-muted/20 border-none hover:bg-muted/40 transition-colors duration-300 group">
                      <CardHeader className="p-4">
                        <div className="aspect-square rounded-md overflow-hidden mb-4">
                           <img
                            src={release.imageUrl}
                            alt={release.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <CardTitle className="text-base font-bold truncate group-hover:underline">
                          {release.title}
                        </CardTitle>
                        <CardDescription className="text-sm text-muted-foreground truncate">
                          {release.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </ContentGrid>
            </main>
          </ScrollArea>
        </div>
      </div>

      <AppFooter />
    </div>
  );
};

export default HomePage;