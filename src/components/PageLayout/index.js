import React from 'react';
import { PageHeader } from 'components/PageHeader';
import { PageFooter } from 'components/PageFooter';

export const PageLayout = ({ children, renderHeader }) => {
  return (
    <>
      <PageHeader></PageHeader>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {renderHeader()}
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="px-2 py-4 h-full border-4 border-dashed border-gray-200 rounded-lg h-96">
              {children}
            </div>
          </div>
        </div>
      </main>
      <PageFooter></PageFooter>
    </>
  );
}

export default PageLayout;
