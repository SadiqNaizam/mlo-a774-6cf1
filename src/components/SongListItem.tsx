import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MoreHorizontal, Play, Plus, ListMusic } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

export interface SongListItemProps {
  trackNumber: number;
  title: string;
  artist: string;
  artistSlug: string; // e.g., 'daft-punk'
  duration: string; // e.g., '3:45'
  imageUrl: string;
  onPlay: () => void;
  onAddToPlaylist: () => void;
}

const SongListItem: React.FC<SongListItemProps> = ({
  trackNumber,
  title,
  artist,
  artistSlug,
  duration,
  imageUrl,
  onPlay,
  onAddToPlaylist,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { toast } = useToast();
  
  console.log('SongListItem loaded for:', title);

  const handleAddToQueue = () => {
    console.log(`Adding ${title} to queue.`);
    toast({
      title: "Added to Queue",
      description: `"${title}" has been added to your queue.`,
    });
  };

  return (
    <div
      className="grid grid-cols-[auto,1fr,auto,auto] items-center gap-4 p-2 rounded-md hover:bg-muted/50 transition-colors group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Track Number / Play Button */}
      <div className="w-8 text-center text-muted-foreground">
        {isHovered ? (
          <Button variant="ghost" size="icon" onClick={onPlay} className="w-8 h-8">
            <Play className="h-4 w-4 fill-current" />
          </Button>
        ) : (
          <span>{trackNumber}</span>
        )}
      </div>

      {/* Song Info */}
      <div className="flex items-center gap-3 overflow-hidden">
        <Avatar className="h-10 w-10 rounded">
          <AvatarImage src={imageUrl} alt={title} />
          <AvatarFallback>{artist.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col overflow-hidden">
          <p className="font-medium truncate text-primary">{title}</p>
          <p className="text-sm text-muted-foreground truncate">
            <Link to={`/artist/${artistSlug}`} className="hover:underline">
              {artist}
            </Link>
          </p>
        </div>
      </div>

      {/* Duration */}
      <div className="hidden md:block text-sm text-muted-foreground">
        {duration}
      </div>

      {/* Options Menu */}
      <div className="pr-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className={`w-8 h-8 ${isHovered ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 transition-opacity`}>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleAddToQueue}>
              <ListMusic className="mr-2 h-4 w-4" />
              <span>Add to Queue</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onAddToPlaylist}>
              <Plus className="mr-2 h-4 w-4" />
              <span>Add to Playlist</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default SongListItem;