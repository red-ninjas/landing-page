'use client';
export const Table = (props: any) => (
  <div className="table-wrapper">
    <table className="styled-table">{props.children}</table>
    <style jsx global>{`
      .table-wrapper {
        overflow-x: auto;
        margin: 2rem 0;
        border-radius: 12px;
        border: 1px solid var(--color-border, #e2e2e2);
        background: var(--color-bg, #ffffff);
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
      }

      .styled-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.95rem;
        color: var(--color-text, #222);
      }

      .styled-table thead {
        background: var(--color-header-bg, #f6f6f6);
      }

      .styled-table th,
      .styled-table td {
        padding: 0.9rem 1.25rem;
        text-align: left;
        border-bottom: 1px solid var(--color-border, #e2e2e2);
      }

      .styled-table th {
        font-weight: 600;
        text-transform: uppercase;
        font-size: 0.8rem;
        color: var(--color-heading, #111);
        background: var(--color-header-bg, #fafafa);
        letter-spacing: 0.04em;
      }

      .styled-table tbody tr:hover {
        background-color: var(--color-hover-bg, #fafafa);
        transition: background-color 0.2s ease;
      }

      /* Zebra rows */
      .styled-table tbody tr:nth-child(even) {
        background: var(--color-row-alt, #fcfcfc);
      }
    `}</style>
  </div>
);
