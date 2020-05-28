import Page from "../components/Page";
import { useProjectId } from "../contexts/ProjectId";
import React from "react";
import { ColumnChart } from "@gooddata/sdk-ui-all";
// import { InsightView } from "@gooddata/sdk-ui-all";
import { Ldm, LdmExt } from "../routes/ldm";
import { projectId as workspace } from "../constants";
import { BackendProvider, WorkspaceProvider } from "@gooddata/sdk-ui";
import bearFactory, { ContextDeferredAuthProvider } from "@gooddata/sdk-backend-bear";
import { newPopMeasure, newRelativeDateFilter, newPreviousPeriodMeasure } from "@gooddata/sdk-ui-all";
const backend = bearFactory().withAuthentication(new ContextDeferredAuthProvider());


const primaryMeasure = LdmExt.TotalSales2;
const secondaryMeasure = newPreviousPeriodMeasure(
    LdmExt.TotalSales2,
    [{ dataSet: LdmExt.dateDatasetIdentifier, periodsAgo: 1 }],
    m => m.alias("$ Total Sales - period ago"),
);
const Home = () => {
    const { projectId } = useProjectId();
    return (
        <Page>
            <BackendProvider backend={backend}>
                <WorkspaceProvider workspace={workspace}>
                    <div className="column-chart" style={{ heigh: 350 }}>
                        <ColumnChart
                            measures={[primaryMeasure, secondaryMeasure]}
                            viewBy={[LdmExt.LocationResort]}
                            filters={[newRelativeDateFilter(LdmExt.dateDatasetIdentifier, "GDC.time.year", -2, -1)]}
                        />
                    </div>
                </WorkspaceProvider>
            </BackendProvider>
        </Page>
    );
};

export default Home;
