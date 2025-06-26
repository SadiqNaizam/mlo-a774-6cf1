import React from 'react';

interface ContentGridProps {
  /**
   * The title to be displayed above the grid.
   */
  title: string;
  /**
   * The content to be rendered inside the grid, typically a collection of card components.
   */
  children: React.ReactNode;
}

/**
 * A responsive grid layout component for displaying a collection of cards,
 * used for showing albums, artists, or playlists.
 */
const ContentGrid: React.FC<ContentGridProps> = ({ title, children }) => {
  console.log('ContentGrid loaded with title:', title);

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold tracking-tight mb-4 text-white hover:underline cursor-pointer">
        {title}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
        {children}
      </div>
    </section>
  );
};

export default ContentGrid;