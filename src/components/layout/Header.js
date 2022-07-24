import React from 'react';

export default function Header({ className, ...rest }) {
  return <header className={className ? className : ''}>{rest.children}</header>;
}
