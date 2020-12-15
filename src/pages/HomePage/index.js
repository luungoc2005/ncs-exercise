import React, { useEffect } from 'react';
import { PageLayout } from 'components/PageLayout';

export const HomePage = () => {
  return (
    <PageLayout
      renderHeader={() => 
        <h1 className="text-3xl font-bold leading-tight text-gray-900">
          Explore
        </h1>
      }
    >

    </PageLayout>
  );
}

export default HomePage;
