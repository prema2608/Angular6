import { labels } from './labels';
import { Collaborator } from './Collaborator';

export interface Note {
    title:string;
    description:string;
    archive:boolean;
    inTrash:boolean;
    pinned:boolean; 
    noteId: string;
    userId: string;
    color:string;
    labels:labels[];
    remainder:string;
    collaborators:Collaborator[];
 }
 