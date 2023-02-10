import { Link, useMatches } from '@tanstack/react-router';
import * as React from 'react';

export const Breadcrumbs = () => {
  const matches = useMatches();

  return (
    <div className="breadcrumb">
      {matches.flatMap((match) => {
        const breadcrumb = (match.route.options.meta as any)?.breadcrumb;
        return breadcrumb
          ? [
              <div className="breadcrumb-item" key={match.id}>
                <Link to={match.route.id}>
                  <span>{breadcrumb(match.params)}</span>
                </Link>
              </div>,
            ]
          : [];
      })}
    </div>
  );
};
