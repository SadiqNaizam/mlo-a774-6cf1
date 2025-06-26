import React from 'react';
import MusicPlayer from '@/components/MusicPlayer';

const AppFooter: React.FC = () => {
  console.log('AppFooter loaded');

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t">
      {/* 
        The MusicPlayer component is assumed to exist at '@/components/MusicPlayer' 
        as specified in the <already-generated-components> list. It will manage 
        its own state for playback control.
      */}
      <MusicPlayer />
    </footer>
  );
};

export default AppFooter;