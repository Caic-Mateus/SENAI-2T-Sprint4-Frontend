import React from 'react';

const RepoItem = ({repo}) => (
    <a 
        href={repo.html_url}
        key={repo.id}
        className="repoItemContainer"
        target="_blank"
    >
        <span>{repo.name}</span>
        <span>Stars : {repo.stargazers_count}</span>
        <span>Id : {repo.id}</span>
        <span>Descrição : {repo.description}</span>
        <span>Data de Criação : {repo.created_at}</span>
        <span>Tamanho : {repo.size}</span>

    </a>
);

export default RepoItem;