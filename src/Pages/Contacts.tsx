import { useSearchParams } from "react-router-dom";
import ScrollToTop from "../Components/ScrollToTop";
import { UpdatePageTitle } from "../utils/UpdatePageInfo";
import { FilterField } from "../Components/FilterComponent";
import { useState } from "react";

// This page and it's css will probably undergo revamp at some point in the future. For now, this is what we're using.

export default function AuditLogs() {
    UpdatePageTitle("Contacts | Loggerithm");
    ScrollToTop();

    const [searchParams, setSearchParams] = useSearchParams();

    const [filters, setFilters] = useState({
        callsign: {
            enabled: false,
            value: "",
        },
        operator: {
            enabled: false,
            value: "",
        },
        band: {
            enabled: false,
            value: "",
        },
        mode: {
            enabled: false,
            value: "",
        },
        park: {
            enabled: false,
            value: "",
        },
        type: {
            enabled: false,
            value: "",
        },
        startdate: {
            enabled: false,
            value: "",
        },
        enddate: {
            enabled: false,
            value: "",
        }
    })

    return (
        <div className="auditpage">
            <h1>Contacts</h1>
            <p>Review and edit submitted logs, as well as filter and download logs.</p>
            <p>Filter by date and time, callsign, station call, log type (eg. Field Day, POTA, normal), by contact callsign, mode, tx power, and park id.</p>
            <p>Filters apply to downloads, meaning you can download logs by day, by log type, contact callsign, by callsign, etc.</p>
            <p>You may only edit logs that you have submitted under your callsign.</p>
            <p><em className="goldtext">Gold callsigns</em> are those within the club, while <em className="redtext">red callsigns</em> are not recognized in the club.</p>
            <p><em className="greentext">Green timestamps</em> are within the past 15 minutes, <em className="goldtext">yellow timestamps</em> are within the last 30, and <em className="redtext">red timestamps</em> are any older than 30 minutes.</p>
            <p><em className="bluetext">Blue contact types</em> are for normal logs, <em className="greentext">green contact types</em> are for POTAs, and <em className="redtext">red contact types</em> are for field days.</p>
            <div className="filterssection"> {/* Advanced filters section, useful for filtering. */}
                <h2>Filters</h2>
                <p>Select the filters you wish to apply to your search, enter the value you desire, and then click "Apply"</p>
                <div className="filtersarea">
                    <div className="filterselection">
                        <FilterField 
                            label="Callsign" 
                            enabled={filters.callsign.enabled}
                            onEnabledChange={(enabled) => 
                                setFilters({
                                    ...filters,
                                    callsign: {
                                        ...filters.callsign,
                                        enabled,
                                    },
                                })
                            }
                        />
                        <input
                            value={filters.callsign.value}
                            disabled={!filters.callsign.enabled}
                            onChange={(e) => 
                                setFilters({
                                    ...filters,
                                    callsign: {
                                        ...filters.callsign,
                                        value: e.target.value,
                                    },
                                })
                            }
                        />
                    </div>
                    <div className="filterselection">
                        <FilterField 
                            label="Operator"
                            enabled={filters.operator.enabled}
                            onEnabledChange={(enabled) => setFilters({
                                ...filters,
                                operator: {
                                    ...filters.operator,
                                    enabled,
                                },
                            })}
                        />
                        <input 
                            value={filters.operator.value}
                            disabled={!filters.operator.enabled}
                            onChange={(e) =>
                                setFilters({
                                    ...filters,
                                    operator: {
                                        ...filters.operator,
                                        value: e.target.value,
                                    },
                                })
                            }
                        />
                    </div>
                    <div className="filterselection">
                        <FilterField 
                            label="Band"
                            enabled={filters.band.enabled}
                            onEnabledChange={(enabled) => setFilters({
                                ...filters,
                                band: {
                                    ...filters.band,
                                    enabled,
                                },
                            })}
                        />
                        <select value={filters.band.value} disabled={!filters.band.enabled} onChange={(e) => setFilters({...filters, band: {...filters.band, value: e.target.value}, })}>
                            <option value="">All bands</option>
                            <option value="6m">6m</option>
                            <option value="10m">10m</option>
                            <option value="12m">12m</option>
                            <option value="15m">15m</option>
                            <option value="17m">17m</option>
                            <option value="20m">20m</option>
                            <option value="30m">30m</option>
                            <option value="40m">40m</option>
                            <option value="60m">60m</option>
                            <option value="80m">80m</option>
                            <option value="160m">160m</option>
                        </select>
                    </div>
                    <div className="filterselection">
                        <FilterField 
                            label="Mode"
                            enabled={filters.mode.enabled}
                            onEnabledChange={(enabled) => setFilters({
                                ...filters,
                                mode: {
                                    ...filters.mode,
                                    enabled,
                                },
                            })}
                        />
                        <input value={filters.mode.value} disabled={!filters.mode.enabled} onChange={(e) => setFilters({
                            ...filters,
                            mode: {
                                ...filters.mode,
                                value: e.target.value,
                            },
                        })}/>
                    </div>
                    <div className="filterselection">
                        <FilterField 
                            label="Park"
                            enabled={filters.park.enabled}
                            onEnabledChange={(enabled) => setFilters({
                                ...filters,
                                park: {
                                    ...filters.park,
                                    enabled,
                                },
                            })}
                        />
                        <input 
                            value={filters.park.value}
                            disabled={!filters.park.enabled}
                            onChange={(e) => setFilters({
                                ...filters,
                                park: {
                                    ...filters.park,
                                    value: e.target.value,
                                },
                            })}
                        />
                    </div>
                    <div className="filterselection">
                        <FilterField 
                            label="Type"
                            enabled={filters.type.enabled}
                            onEnabledChange={(enabled) => setFilters({
                                ...filters,
                                type: {
                                    ...filters.type,
                                    enabled,
                                },
                            })}
                        />
                        <select value={filters.type.value} disabled={!filters.type.enabled} onChange={(e) => setFilters({
                            ...filters,
                            type: {
                                ...filters.type,
                                value: e.target.value,
                            },
                        })}>
                            <option value="normal">Normal</option>
                            <option value="pota">POTA</option>
                            <option value="field day">Field Day</option>
                        </select>
                    </div>
                    <div className="filterselection">
                        <FilterField
                            label="Start Date"
                            enabled={filters.startdate.enabled}
                            onEnabledChange={(enabled) => setFilters({
                                ...filters,
                                startdate: {
                                    ...filters.startdate,
                                    enabled,
                                },
                            })}
                        />
                        <input type="datetime-local"
                            value={filters.startdate.value}
                            disabled={!filters.startdate.enabled}
                            onChange={(e) => setFilters({
                                ...filters,
                                startdate: {
                                    ...filters.startdate,
                                    value: e.target.value,
                                },
                            })}
                        />
                    </div>
                    <div className="filterselection">
                        <FilterField 
                            label="End Date"
                            enabled={filters.enddate.enabled}
                            onEnabledChange={(enabled) => setFilters({
                                ...filters,
                                enddate: {
                                    ...filters.enddate,
                                    enabled,
                                },
                            })}
                        />
                        <input type="datetime-local"
                            value={filters.enddate.value}
                            disabled={!filters.enddate.enabled}
                            onChange={(e) => setFilters({
                                ...filters,
                                enddate: {
                                    ...filters.enddate,
                                    value: e.target.value,
                                },
                            })}
                        />
                    </div>
                </div>
                <button>Apply</button>
            </div>
            <div className="auditholder">
                <div className="auditcard">
                    <div className="loginfoheader">
                        <h2>K4UCF</h2>
                    </div>
                    <div className="loginfobody">
                        <div className="box">
                            <p><b>Mode:</b> FT8</p>
                        </div>
                        <div className="box">
                            <p><b>Band:</b> 40m</p>
                        </div>
                        <div className="box">
                            <p><b>Signal Report Sent:</b> 59</p>
                        </div>
                        <div className="box">
                            <p><b>Signal Report Received:</b> 59</p>
                        </div>
                        <div className="box">
                            <p><b>Frequency:</b> 7.300</p>
                        </div>
                        <div className="box">
                            <p><b>Comments:</b> bro has an amateur extra before skye1</p>
                        </div>
                    </div>
                    <div className="loginfofooter">
                        <div className="audittag audittag--gold">K9SRH</div>
                        <div className="audittag audittag--green">Submitted at 9:35 AM</div>
                        <div className="audittag audittag--red">Field Day Contact</div>
                    </div>
                </div>
            </div>
        </div>
    );
}