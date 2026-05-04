import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function Card({ icon, darkIcon, name, artifact, description, docsLink, downloadLink, sourceLink }) {
  return (
    <div className="md-card sdk-card">
      <div className="sdk-card-header">
        <div className="sdk-card-info">
          <div className="sdk-card-icon-container">
            <img className="sdk-card-icon" src={useBaseUrl(icon)} alt={name} />
            {darkIcon && <img className="sdk-card-icon sdk-card-icon--dark" src={useBaseUrl(darkIcon)} alt={name} />}
          </div>
          <div className="sdk-card-package-info">
            <h4 className="sdk-card-heading">{name}</h4>
            <div className="sdk-card-artifact-id">
              <code>{artifact}</code>
            </div>
          </div>
        </div>
      </div>
      <div className="sdk-card-description">
        <p>{description}</p>
      </div>
      <div className="integration-card-source-links">
        {docsLink && (
          <a className="source-link" href={useBaseUrl(docsLink)} title="Documentation">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M3 2h7v1H3v10h7v1H2V3h1zm7 3.5V4L8 5.5V4L6 6l2 2V6.5L10 7.5zM7.5 7h2V6h-2v1zM7 8h3V7H7v1zm-1 1h4V8H6v1z"/></svg>
          </a>
        )}
        {downloadLink && (
          <a className="source-link" href={downloadLink} target="_blank" rel="noopener noreferrer" title="Download sample">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M7.5 1v7.29L4.85 5.65l-.7.7L8 10.2l3.85-3.85-.7-.7L8.5 8.29V1h-1zM2 12h12v1H2v-1z"/></svg>
          </a>
        )}
        {sourceLink && (
          <a className="source-link" href={sourceLink} target="_blank" rel="noopener noreferrer" title="Source">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
          </a>
        )}
      </div>
    </div>
  );
}
