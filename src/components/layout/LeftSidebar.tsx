import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Home, Search, Library, Plus, ListMusic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

const LeftSidebar: React.FC = () => {
  console.log('LeftSidebar loaded');

  // Mock data for user playlists
  const playlists = [
    { id: '1', name: "Doraemon's Gadget Mix" },
    { id: '2', name: 'Nobita\'s Chill Lo-fi' },
    { id: '3', name: 'Shizuka\'s Study Beats' },
    { id: '4', name: 'Giant\'s Power Anthems' },
    { id: '5', name: 'Suneo\'s Rich Vibes' },
    { id: '6', name: 'Future Funk Favorites' },
    { id: '7', name: 'Anime Openings' },
    { id: '8', name: 'J-Pop Hits' },
    { id: '9', name: 'City Pop Classics' },
  ];
  
  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-4 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-primary/10 text-primary-foreground'
        : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
    }`;

  return (
    <aside className="hidden md:flex flex-col w-64 bg-background border-r h-screen">
      <div className="p-4">
        <Link to="/" className="flex items-center gap-2">
          {/* Using ListMusic as a placeholder for a custom logo */}
          <ListMusic className="h-8 w-8 text-primary" />
          <h1 className="text-xl font-bold">Doraemify</h1>
        </Link>
      </div>
      <nav className="flex flex-col p-2">
        <NavLink to="/" className={navLinkClasses}>
          <Home className="h-5 w-5" />
          Home
        </NavLink>
        <NavLink to="/search" className={navLinkClasses}>
          <Search className="h-5 w-5" />
          Search
        </NavLink>
        <NavLink to="/library" className={navLinkClasses}>
          <Library className="h-5 w-5" />
          Your Library
        </NavLink>
      </nav>
      
      <Separator className="my-2" />

      <div className="flex-1 flex flex-col p-2 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2">
          <h2 className="text-sm font-semibold text-muted-foreground">Playlists</h2>
          <Button variant="ghost" size="icon">
            <Plus className="h-4 w-4" />
            <span className="sr-only">Create Playlist</span>
          </Button>
        </div>
        <ScrollArea className="flex-1">
          <div className="space-y-1 p-2">
            {playlists.map((playlist) => (
              <Link
                key={playlist.id}
                to={`/playlist`} // Links to the generic playlist page as per App.tsx
                className="block px-4 py-2 text-sm text-muted-foreground rounded-md hover:bg-muted/50 hover:text-foreground"
              >
                {playlist.name}
              </Link>
            ))}
          </div>
        </ScrollArea>
      </div>
    </aside>
  );
};

export default LeftSidebar;