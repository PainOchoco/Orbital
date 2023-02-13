// from https://www.space-track.org/basicspacedata/modeldef/class/gp/format/html

type SatelliteRaw = {
    CCSDS_OMM_VERS: string;
    COMMENT: string;
    CREATION_DATE: string | null;
    ORIGINATOR: string;
    OBJECT_NAME: string;
    OBJECT_ID: string;
    CENTER_NAME: string | null;
    REF_FRAME: string | null;
    TIME_SYSTEM: string;
    MEAN_ELEMENT_THEORY: string;
    EPOCH: string | null;
    MEAN_MOTION: string | null;
    ECCENTRICITY: string | null;
    INCLINATION: string | null;
    RA_OF_ASC_NODE: string | null;
    ARG_OF_PERICENTER: string | null;
    MEAN_ANOMALY: string | null;
    EPHEMERIS_TYPE: string | null;
    CLASSIFICATION_TYPE: string | null;
    NORAD_CAT_ID: string;
    ELEMENT_SET_NO: string | null;
    REV_AT_EPOCH: string | null;
    BSTAR: string;
    MEAN_MOTION_DOT: string | null;
    MEAN_MOTION_DDOT: string | null;
    SEMIMAJOR_AXIS: string | null;
    PERIOD: string | null;
    APOAPSIS: string | null;
    PERIAPSIS: string | null;
    OBJECT_TYPE: string | null;
    RCS_SIZE: string | null;
    COUNTRY_CODE: string | null;
    LAUNCH_DATE: string | null;
    SITE: string | null;
    DECAY_DATE: string | null;
    FILE: string | null;
    GP_ID: string;
    TLE_LINE0: string | null;
    TLE_LINE1: string | null;
    TLE_LINE2: string | null;
};

export default SatelliteRaw;
