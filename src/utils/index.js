/* eslint-disable import/prefer-default-export */
export const filterQueryByName = (query, name) => query.edges.filter(({ node }) => node.name === name)[0]?.node;
