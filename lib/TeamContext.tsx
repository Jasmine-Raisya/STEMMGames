import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ReflectionEntry {
    id: string;
    date: string;
    text: string;
}

export interface TeamData {
    teamName: string;
    members: string;
    gradeLevel: string;
    discriminator: string;
}

interface TeamContextType {
    team: TeamData | null;
    reflections: ReflectionEntry[];
    setTeam: (data: TeamData) => void;
    addReflection: (text: string) => void;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export function TeamProvider({ children }: { children: ReactNode }) {
    const [team, setTeam] = useState<TeamData | null>(null);
    const [reflections, setReflections] = useState<ReflectionEntry[]>([]);

    const addReflection = (text: string) => {
        const newEntry: ReflectionEntry = {
            id: Date.now().toString(),
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            text,
        };
        setReflections(prev => [newEntry, ...prev]);
    };

    return (
        <TeamContext.Provider value={{ team, reflections, setTeam, addReflection }}>
            {children}
        </TeamContext.Provider>
    );
}

export function useTeam() {
    const context = useContext(TeamContext);
    if (!context) {
        throw new Error('useTeam must be used within a TeamProvider');
    }
    return context;
}
