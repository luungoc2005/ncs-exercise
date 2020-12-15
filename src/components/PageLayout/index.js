import React from 'react';
import { PageHeader } from 'components/PageHeader';
import { PageFooter } from 'components/PageFooter';

export const PageLayout = ({ children }) => {
  return (
    <>
      <PageHeader></PageHeader>
      <article>
        {children}
      </article>
      <PageFooter></PageFooter>
    </>
  );
}

export default PageLayout;
