<?php


namespace App\Garmin\Stock\Request;

use App\Garmin\Stock\Request\Traits\PrepareUri;
use App\Garmin\Stock\Response\Iterators\ActivityDetailsIterator;
use App\Garmin\Stock\Response\Iterators\BaseIteratorResponse;

class ActivityDetails extends Base
{
    use PrepareUri;

    protected $activityId = '3720067292';
    protected $uri = 'https://connect.garmin.com/modern/proxy/activity-service/activity/{activityId}';

    /**
     * @return string
     */
    public function getActivityId(): string
    {
        return $this->activityId;
    }

    /**
     * @param string $activityId
     * @return ActivityDetails
     */
    public function setActivityId(string $activityId): ActivityDetails
    {
        $this->activityId = $activityId;
        return $this;
    }

    public function response(): BaseIteratorResponse
    {
        return new ActivityDetailsIterator($this);
    }
}