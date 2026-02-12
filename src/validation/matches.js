import { z } from 'zod';

/**
 * Match status constants
 */
export const MATCH_STATUS = {
    SCHEDULED: 'scheduled',
    LIVE: 'live',
    FINISHED: 'finished',
};

/**
 * Validate list matches query params
 * ?limit=10
 */
export const listMatchesQuerySchema = z.object({
    limit: z.coerce
        .number()
        .int()
        .positive()
        .max(100)
        .optional(),
});

/**
 * Validate :id param
 */
export const matchIdParamSchema = z.object({
    id: z.coerce
        .number()
        .int()
        .positive(),
});

/**
 * Helper: ISO date validation
 */
const isoDateString = z.iso.datetime();

/**
 * Create match schema
 */
export const createMatchSchema = z
    .object({
        sport: z
            .string()
            .min(1, 'Sport is required'),

        homeTeam: z
            .string()
            .min(1, 'Home team is required'),

        awayTeam: z
            .string()
            .min(1, 'Away team is required'),

        startTime: z.iso.datetime(),

        endTime: z.iso.datetime(),

        homeScore: z.coerce
            .number()
            .int()
            .min(0)
            .optional(),

        awayScore: z.coerce
            .number()
            .int()
            .min(0)
            .optional(),
    })
    .superRefine((data, ctx) => {
        const start = new Date(data.startTime);
        const end = new Date(data.endTime);

        if (end <= start) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['endTime'],
                message: 'endTime must be after startTime',
            });
        }
    });

/**
 * Update match score schema
 */
export const updateScoreSchema = z.object({
    homeScore: z.coerce
        .number()
        .int()
        .min(0),

    awayScore: z.coerce
        .number()
        .int()
        .min(0),
});