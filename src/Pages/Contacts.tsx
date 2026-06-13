import { useSearchParams } from "react-router-dom";
import ScrollToTop from "../Components/ScrollToTop";
import { UpdatePageTitle } from "../utils/UpdatePageInfo";
import { FilterField } from "../Components/FilterComponent";
import { useState } from "react";
import { getRequest } from "../utils/Requests";
import { useToast } from "../Components/ToastProvider";

// This page and it's css will probably undergo revamp at some point in the future. For now, this is what we're using.

type Contact = {
    id: number;
    operator: string;
    station: string;
    park: string | null;
    contact: string;
    contact_ops: string | null;
    power: string;
    state: string | null;
    region: string | null;
    contact_parks: string | null;
    frequency: string;
    band: string;
    mode: string;
    rst_sent: string | null;
    rst_received: string | null;
    radio: string | null;
    type: "normal" | "field-day" | "pota";
    comments: string | null;
    logged: number;
    lastupdated: number | null;
}

type response = {
    contacts: Contact[];
    pagination: {
        page: number;
        pageSize: number;
        totalPages: number;
        totalRecords: number;
    }
}

export default function AuditLogs() {
    UpdatePageTitle("Contacts | Loggerithm");
    ScrollToTop();

    const [, setSearchParams] = useSearchParams();
    const { notify } = useToast();
    const [contacts, setContacts] = useState<Contact[]>([]);

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

    function displayLogs(res: response) {
        console.log(res);
        setContacts(res.contacts);
    }

    async function onApply() {
        const params = new URLSearchParams;

        for (const [key, filter] of Object.entries(filters)) {
            if (filter.enabled && filter.value) {
                console.log(key, filter.value);
                params.set(key, String(filter.value))
            }
        }

        setSearchParams(params);

        try {
            const packet = await getRequest(`/contacts?${params.toString()}`);

            if (!packet.ok) {
                notify(`An error occurred while trying to get logs: ${packet.error}`, "error");
                return;
            }

            if (packet.status !== 200) {
                notify(`An error occurred while trying to get logs: ${packet.data.error}`, "error");
                return;
            }

            console.log(packet);

            notify(`Request was successful`, "success");
            displayLogs(packet.data);
        } catch (err: any) {
            notify(`Error: ${err}`, "error");
        }
    }

    return (
        <div className="auditpage">
            <h1>Contacts</h1>
            <p>Review and edit submitted logs, as well as filter and download logs.</p>
            <p>Filter by date and time, callsign, station call, log type (eg. Field Day, POTA, normal), by contact callsign, mode, tx power, and park id.</p>
            <p>Filters apply to downloads, meaning you can download logs by day, by log type, contact callsign, by callsign, etc.</p>
            <p>You may only edit logs that you have submitted under your callsign.</p>
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
                            <option value="field-day">Field Day</option>
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
                <button onClick={onApply}>Apply</button>
            </div>
            <div className="auditholder">
                {contacts.map((contact) => (
                    <div key={contact.id} className="auditcard">
                        <div className="loginfoheader">
                            <h2>{contact.contact}</h2>
                        </div>
                        <div className="loginfobody">
                            <div className="box">
                                <p><b>Mode:</b> {contact.mode}</p>
                            </div>
                            <div className="box">
                                <p><b>Band:</b> {contact.band}</p>
                            </div>
                            {contact.rst_sent && 
                                <div className="box">
                                    <p><b>Signal Report Sent:</b> {contact.rst_sent}</p>
                                </div>
                            }
                            {contact.rst_received && 
                                <div className="box">
                                    <p><b>Signal Report Received:</b> {contact.rst_received}</p>
                                </div>
                            }
                            {contact.contact_ops &&
                            <div className="box">
                                <p><b>Contact Operators:</b> {contact.contact_ops}</p>
                            </div>
                            }
                            {contact.park && 
                            <div className="box">
                                <p><b>Operated Park:</b> {contact.park}</p>
                            </div>
                            }
                            {contact.contact_parks &&
                            <div className="box">
                                <p><b>Contact Parks:</b> {contact.contact_parks}</p>
                            </div>
                            }
                            {contact.region &&
                            <div className="box">
                                <p><b>Contact Region:</b> {contact.region}</p>
                            </div>
                            }
                            {contact.state &&
                            <div className="box">
                                <p><b>State:</b> {contact.state}</p>
                            </div>
                            }
                            <div className="box">
                                <p><b>Frequency:</b> {contact.frequency}</p>
                            </div>
                            <div className="box">
                                <p><b>Power:</b> {contact.power}W</p>
                            </div>
                            <div className="box">
                                <p><b>Radio:</b> {contact.radio ? contact.radio : "No radio was logged"}</p>
                            </div>
                            <div className="box">
                                <p><b>Comments:</b> {contact.comments ? contact.comments : "No comments were added"}</p>
                            </div>
                        </div>
                        <div className="loginfofooter">
                            <div className="audittag audittag--gold">{contact.operator}</div>
                            <div className="audittag audittag--green">{new Date(contact.logged * 1000).toLocaleString()}</div>
                            {contact.type === "field-day" &&
                            <div className="audittag audittag--red">Field Day</div>
                            }
                            {contact.type === "normal" &&
                            <div className="audittag audittag--blue">Normal Log</div>
                            }
                            {contact.type === "pota" &&
                            <div className="audittag audittag--green">POTA</div>
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}